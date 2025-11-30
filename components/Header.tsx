import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image 
            src="/logo.png" 
            alt="Build Your Own Solution - but-lernfoerderung.de Logo" 
            width={280}
            height={84}
            priority
            style={{ height: 'auto', width: 'auto', maxHeight: '84px' }}
            className="logo-image"
          />
        </Link>
        <ul>
          <li>
            <Link href="/">Startseite</Link>
          </li>
          <li>
            <Link href="/bildung-und-teilhabe">Was ist BuT?</Link>
          </li>
          <li>
            <Link href="/kontakt">Kontakt</Link>
          </li>
          <li>
            <Link href="/impressum">Impressum</Link>
          </li>
          <li>
            <Link href="/datenschutz">Datenschutz</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
