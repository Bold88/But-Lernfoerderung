import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { stadt: string } }): Metadata {
  const stadt = params.stadt
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `Nachhilfe in ${stadt} kostenlos durch Bildung und Teilhabe | but-lernfoerderung.de`,
    description: `Kostenlose Nachhilfe in ${stadt} durch das Bildung und Teilhabe Programm. Prüfen Sie jetzt Ihren Anspruch auf kostenlose Lernförderung für Ihr Kind.`,
    keywords: `Nachhilfe ${stadt}, kostenlose Nachhilfe ${stadt}, BuT ${stadt}, Lernförderung ${stadt}, Nachhilfe Bildung und Teilhabe ${stadt}`,
    openGraph: {
      title: `Nachhilfe in ${stadt} kostenlos durch BuT`,
      description: `Sichern Sie kostenlose Nachhilfe für Ihr Kind in ${stadt}`,
      type: 'website',
    },
  }
}

export default function StadtLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

