import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <Image 
            src="/logo.png" 
            alt="but-lernfoerderung.de Logo" 
            width={320}
            height={96}
            style={{ maxWidth: '320px', height: 'auto', marginBottom: '1rem' }}
            className="footer-logo-image"
          />
          <p style={{ fontSize: '0.875rem', color: 'white', lineHeight: '1.8' }}>
            Zentrale Plattform für <strong>Bildung &amp; Teilhabe</strong> – wir vermitteln Anfragen ausschließlich an 
            <strong> geprüfte Nachhilfeinstitute</strong>.
          </p>
        </div>
        <div className="footer-section">
          <h3>Schnellzugriff</h3>
          <ul>
            <li>
              <Link href="#but-check">BuT-Check starten</Link>
            </li>
            <li>
              <Link href="/bildung-und-teilhabe">Was ist Bildung und Teilhabe?</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Rechtliches</h3>
          <ul>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz">Datenschutz</Link>
            </li>
            <li>
              <Link href="/cookie-policy">Cookie Richtlinien</Link>
            </li>
            <li>
              <Link href="/agbs">AGBs</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Kontakt</h3>
          <p style={{ fontSize: '0.875rem', color: 'white', lineHeight: '1.8' }}>
            <strong>Minilernkreis GmbH</strong><br />
            Hauptstraße 136<br />
            33647 Bielefeld<br />
            <br />
            <strong>E-Mail:</strong><br />
            <a href="mailto:info@but-lernfoerderung.de" style={{ color: 'white', textDecoration: 'underline' }}>info@but-lernfoerderung.de</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p style={{ fontSize: '0.875rem', color: 'white' }}>
          ©2025 BuT-Lernförderung – Alle Rechte vorbehalten.
        </p>
        <p style={{ fontSize: '0.875rem', color: 'white' }}>
          powered by <a href="http://www.antrieb2punkt0.de" style={{ color: 'white', textDecoration: 'underline' }}>Antrieb2.0</a>
        </p>
        <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/cookie-policy">Cookies</Link>
          <Link href="/impressum">Impressum</Link>
        </nav>
      </div>
    </footer>
  )
}
