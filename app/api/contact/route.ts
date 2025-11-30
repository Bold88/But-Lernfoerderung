import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

const DATA_DIR = join(process.cwd(), 'data')
const CONTACTS_FILE = join(DATA_DIR, 'contacts.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
}

// Read contacts from file
async function readContacts() {
  try {
    await ensureDataDir()
    const data = await readFile(CONTACTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Write contacts to file
async function writeContacts(contacts: any[]) {
  await ensureDataDir()
  await writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.first_name || !body.last_name || !body.email || !body.city) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen' },
        { status: 400 }
      )
    }

    // Read existing contacts
    const contacts = await readContacts()

    // Create new contact entry
    const newContact = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      status: 'new', // new, contacted, completed
    }

    // Add to contacts array
    contacts.push(newContact)

    // Save to file
    await writeContacts(contacts)

    console.log('Contact form submission saved:', newContact.id)

    return NextResponse.json(
      { message: 'Anfrage erfolgreich übermittelt', id: newContact.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Anfrage' },
      { status: 500 }
    )
  }
}
