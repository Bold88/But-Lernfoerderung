import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie-Richtlinie | but-lernfoerderung.de',
  description: 'Informationen über die Verwendung von Cookies auf dieser Website',
}

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      
      <main>
        <section style={{ background: 'white', padding: '5rem 2rem' }}>
          <div className="container-warm" style={{ maxWidth: '900px' }}>
            <div className="card-modern">
              <h1 style={{ color: '#1e40af', marginBottom: '2rem' }}>Cookie-Richtlinie</h1>
              
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>Was sind Cookies?</h2>
                <p>
                  Cookies sind kleine Textdateien, die auf Ihrem Endgerät (Computer, Tablet oder 
                  Mobilgerät) gespeichert werden, wenn Sie eine Website besuchen. Cookies werden 
                  verwendet, um die Website für Sie zu personalisieren und Ihre Präferenzen zu 
                  speichern.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>Wie verwenden wir Cookies?</h2>
                <p>
                  Wir verwenden Cookies, um:
                </p>
                <ul style={{ marginLeft: '2rem', marginTop: '0.5rem', lineHeight: '2' }}>
                  <li>Ihre Cookie-Präferenzen zu speichern</li>
                  <li>Die Funktionalität der Website zu gewährleisten</li>
                  <li>Die Nutzung der Website zu analysieren (sofern Sie zugestimmt haben)</li>
                </ul>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>Arten von Cookies</h2>
                
                <h3 style={{ color: '#6b7280', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Notwendige Cookies</h3>
                <p>
                  Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich. 
                  Sie können nicht deaktiviert werden.
                </p>

                <h3 style={{ color: '#6b7280', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Funktionale Cookies</h3>
                <p>
                  Diese Cookies ermöglichen es der Website, erweiterte Funktionalität und 
                  Personalisierung bereitzustellen.
                </p>

                <h3 style={{ color: '#6b7280', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Analytische Cookies</h3>
                <p>
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, 
                  indem Informationen anonym gesammelt und gemeldet werden.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>Cookie-Verwaltung</h2>
                <p>
                  Sie können Cookies in Ihren Browser-Einstellungen verwalten und löschen. Bitte 
                  beachten Sie, dass das Deaktivieren von Cookies die Funktionalität dieser Website 
                  beeinträchtigen kann.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>Änderungen dieser Cookie-Richtlinie</h2>
                <p>
                  Wir behalten uns vor, diese Cookie-Richtlinie von Zeit zu Zeit zu aktualisieren. 
                  Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um über Änderungen 
                  informiert zu bleiben.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

