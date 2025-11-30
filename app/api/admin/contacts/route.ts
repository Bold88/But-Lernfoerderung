import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

const DATA_DIR = join(process.cwd(), 'data')
const CONTACTS_FILE = join(DATA_DIR, 'contacts.json')

// Simple authentication check (in production, use proper auth)
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  // For now, we'll use a simple session check
  // In production, implement proper JWT or session management
  return true // TODO: Implement proper authentication
}

async function readContacts() {
  try {
    const data = await readFile(CONTACTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const contacts = await readContacts()
    
    // Sort by date, newest first
    contacts.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ contacts }, { status: 200 })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Anfragen' },
      { status: 500 }
    )
  }
}

