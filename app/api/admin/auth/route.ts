import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import crypto from 'crypto'

// Mark route as dynamic
export const dynamic = 'force-dynamic'

const DATA_DIR = join(process.cwd(), 'data')
const ADMINS_FILE = join(DATA_DIR, 'admins.json')

// Superadmin-Konten mit gehashten Passwörtern
const SUPERADMINS = [
  {
    email: 'b.molor@minilernkreis.de',
    passwordHash: '', // Wird beim ersten Start generiert
    role: 'superadmin',
    createdAt: new Date().toISOString()
  },
  {
    email: 'b.knetsch@minilernkreis.de',
    passwordHash: '', // Wird beim ersten Start generiert
    role: 'superadmin',
    createdAt: new Date().toISOString()
  }
]

// Passwörter generieren
function generatePassword(): string {
  const length = 16
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  const values = crypto.getRandomValues(new Uint32Array(length))
  return Array.from(values, x => charset[x % charset.length]).join('')
}

// Passwort hashen
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Passwort verifizieren
function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Admins initialisieren
async function initializeAdmins() {
  try {
    await mkdir(DATA_DIR, { recursive: true })
    
    let admins: any[] = []
    let passwords: Record<string, string> = {}
    
    try {
      const data = await readFile(ADMINS_FILE, 'utf-8')
      admins = JSON.parse(data)
    } catch {
      // Datei existiert nicht, erstelle neue Admins
      for (const admin of SUPERADMINS) {
        const password = generatePassword()
        passwords[admin.email] = password
        admins.push({
          ...admin,
          passwordHash: hashPassword(password)
        })
      }
      await writeFile(ADMINS_FILE, JSON.stringify(admins, null, 2), 'utf-8')
      
      // Speichere Passwörter in separater Datei (nur für Initialisierung)
      const PASSWORDS_FILE = join(DATA_DIR, 'admin-passwords.txt')
      let passwordText = '=== ADMIN PASSWÖRTER ===\n\n'
      passwordText += 'WICHTIG: Diese Datei sollte nach dem ersten Start gelöscht werden!\n\n'
      for (const [email, password] of Object.entries(passwords)) {
        passwordText += `${email}: ${password}\n`
      }
      await writeFile(PASSWORDS_FILE, passwordText, 'utf-8')
    }
    
    return passwords
  } catch (error) {
    console.error('Error initializing admins:', error)
    return {}
  }
}

// Login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-Mail und Passwort sind erforderlich' },
        { status: 400 }
      )
    }

    // Admins laden
    let admins: any[] = []
    try {
      const data = await readFile(ADMINS_FILE, 'utf-8')
      admins = JSON.parse(data)
    } catch {
      // Initialisiere Admins beim ersten Login
      await initializeAdmins()
      const data = await readFile(ADMINS_FILE, 'utf-8')
      admins = JSON.parse(data)
    }

    // Admin finden
    const admin = admins.find((a: any) => a.email === email.toLowerCase())

    if (!admin) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail oder Passwort' },
        { status: 401 }
      )
    }

    // Passwort verifizieren
    if (!verifyPassword(password, admin.passwordHash)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail oder Passwort' },
        { status: 401 }
      )
    }

    // Session-Token generieren (einfach, für Produktion JWT verwenden)
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 Stunden

    return NextResponse.json({
      success: true,
      token,
      expiresAt: expiresAt.toISOString(),
      user: {
        email: admin.email,
        role: admin.role
      }
    }, { status: 200 })
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json(
      { error: 'Fehler beim Anmelden' },
      { status: 500 }
    )
  }
}

// Passwörter abrufen (nur beim ersten Start)
export async function GET(request: NextRequest) {
  try {
    const passwords = await initializeAdmins()
    
    if (Object.keys(passwords).length > 0) {
      return NextResponse.json({
        message: 'Admins initialisiert',
        passwords: passwords,
        note: 'Diese Passwörter wurden auch in data/admin-passwords.txt gespeichert'
      }, { status: 200 })
    } else {
      return NextResponse.json({
        message: 'Admins bereits initialisiert',
        note: 'Passwörter finden Sie in data/admin-passwords.txt (falls vorhanden)'
      }, { status: 200 })
    }
  } catch (error) {
    console.error('Error getting passwords:', error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Passwörter' },
      { status: 500 }
    )
  }
}

