import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

const DATA_DIR = join(process.cwd(), 'data')
const CONTACTS_FILE = join(DATA_DIR, 'contacts.json')

async function readContacts() {
  try {
    const data = await readFile(CONTACTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

async function writeContacts(contacts: any[]) {
  await writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8')
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contacts = await readContacts()
    const contact = contacts.find((c: any) => c.id === params.id)

    if (!contact) {
      return NextResponse.json(
        { error: 'Anfrage nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json({ contact }, { status: 200 })
  } catch (error) {
    console.error('Error fetching contact:', error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Anfrage' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const contacts = await readContacts()
    const index = contacts.findIndex((c: any) => c.id === params.id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Anfrage nicht gefunden' },
        { status: 404 }
      )
    }

    // Update contact
    contacts[index] = {
      ...contacts[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    await writeContacts(contacts)

    return NextResponse.json(
      { contact: contacts[index], message: 'Anfrage aktualisiert' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren der Anfrage' },
      { status: 500 }
    )
  }
}

