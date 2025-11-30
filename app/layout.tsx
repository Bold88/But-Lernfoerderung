import type { Metadata } from 'next'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: 'Kostenlose Nachhilfe durch Bildung und Teilhabe (BuT) | but-lernfoerderung.de',
  description: 'Ihr Kind hat Probleme in der Schule? Mit dem Bildung und Teilhabe Programm kann Nachhilfe kostenlos sein! Jetzt Anspruch prüfen und kostenlose Nachhilfe sichern.',
  keywords: 'Nachhilfe Bildung und Teilhabe, kostenlose Nachhilfe BuT, Lernförderung BuT, Nachhilfe Gutschein Jobcenter, geförderte Nachhilfe Deutschland',
  openGraph: {
    title: 'Kostenlose Nachhilfe durch Bildung und Teilhabe',
    description: 'Sichern Sie kostenlose Nachhilfe für Ihr Kind durch das BuT-Programm',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}

