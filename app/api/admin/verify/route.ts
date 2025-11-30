import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')
const ADMINS_FILE = join(DATA_DIR, 'admins.json')

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token erforderlich' },
        { status: 400 }
      )
    }

    // In Produktion: Token in Datenbank speichern und verifizieren
    // Für jetzt: Einfache Token-Validierung
    // TODO: Implementiere richtige Token-Verifizierung mit JWT oder Session-DB

    // Für Demo: Token wird im Frontend gespeichert
    // In Produktion sollte hier eine echte Token-Verifizierung stattfinden

    return NextResponse.json({
      valid: true,
      message: 'Token gültig'
    }, { status: 200 })
  } catch (error) {
    console.error('Error verifying token:', error)
    return NextResponse.json(
      { error: 'Fehler bei der Token-Verifizierung' },
      { status: 500 }
    )
  }
}

