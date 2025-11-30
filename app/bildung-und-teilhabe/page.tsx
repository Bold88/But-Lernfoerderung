import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Was ist Bildung und Teilhabe (BuT)? | but-lernfoerderung.de',
  description: 'Erfahren Sie alles über das Bildung und Teilhabe Programm: Wer hat Anspruch, welche Leistungen werden übernommen und wie beantragen Sie die Lernförderung?',
  keywords: 'Bildung und Teilhabe, BuT Programm, Lernförderung beantragen, BuT Antrag, kostenlose Nachhilfe',
}

export default function BildungUndTeilhabePage() {
  return (
    <>
      <Header />
      
      <main>
        <section style={{ padding: '5rem 2rem', background: 'white' }}>
          <div className="container-warm" style={{ maxWidth: '900px' }}>
            <h1>Was ist Bildung und Teilhabe (BuT)?</h1>
            <p>
              Alles, was Sie über das BuT-Programm wissen müssen
            </p>
          </div>
        </section>

        <section style={{ background: 'white', padding: '3rem 1rem' }}>
          <div className="container">
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#1e40af', marginBottom: '1rem' }}>Überblick über BuT-Leistungen</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Das Bildung und Teilhabe (BuT) Programm ist Teil des Sozialgesetzbuches und soll 
                Kindern und Jugendlichen aus einkommensschwachen Familien die Teilnahme am gesellschaftlichen 
                Leben ermöglichen. Die Leistungen umfassen:
              </p>
              
              <ul style={{ marginLeft: '2rem', lineHeight: '2' }}>
                <li><strong>Lernförderung (Nachhilfe):</strong> Kostenlose Nachhilfe für alle Fächer</li>
                <li><strong>Schulbedarf:</strong> Zuschuss für Schulmaterialien</li>
                <li><strong>Schülerbeförderung:</strong> Kostenübernahme für den Schulweg</li>
                <li><strong>Mittagessen:</strong> Kostenloses oder vergünstigtes Mittagessen in Schule/Kita</li>
                <li><strong>Teilhabe am sozialen und kulturellen Leben:</strong> Zuschuss für Sportvereine, Musikunterricht etc.</li>
                <li><strong>eintägige Ausflüge:</strong> Kostenübernahme für Schulausflüge</li>
                <li><strong>mehrtägige Klassenfahrten:</strong> Vollständige Kostenübernahme</li>
              </ul>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#1e40af', marginBottom: '1rem' }}>Wer hat Anspruch auf BuT-Leistungen?</h2>
              <p style={{ marginBottom: '1rem' }}>
                Anspruch auf BuT-Leistungen haben Kinder und Jugendliche, wenn die Familie eine der 
                folgenden Leistungen erhält:
              </p>
              
              <ul style={{ marginLeft: '2rem', lineHeight: '2' }}>
                <li>Leistungen nach dem SGB II (Arbeitslosengeld II / Hartz IV)</li>
                <li>Leistungen nach dem SGB XII (Sozialhilfe)</li>
                <li>Asylbewerberleistungen nach dem AsylbLG</li>
                <li>Wohngeld</li>
                <li>Kinderzuschlag</li>
              </ul>

              <p style={{ marginTop: '1.5rem', padding: '1rem', background: '#eff6ff', borderRadius: '6px' }}>
                <strong>Wichtig:</strong> Das Kind muss eine allgemeinbildende oder berufsbildende Schule 
                besuchen und unter 25 Jahre alt sein. Für die Lernförderung muss zusätzlich eine 
                schulische Förderung erforderlich sein (z.B. schlechte Noten, Versetzungsgefahr).
              </p>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#1e40af', marginBottom: '1rem' }}>Welche Kosten werden übernommen?</h2>
              <p>
                Bei der Lernförderung werden die tatsächlich anfallenden Kosten für die Nachhilfe 
                übernommen. Dies umfasst:
              </p>
              
              <ul style={{ marginLeft: '2rem', lineHeight: '2', marginTop: '1rem' }}>
                <li>Kosten für den Nachhilfeunterricht</li>
                <li>Für alle Fächer, in denen Förderbedarf besteht</li>
                <li>Bis zur Verbesserung der schulischen Leistungen</li>
              </ul>

              <p style={{ marginTop: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '6px' }}>
                <strong>Hinweis:</strong> Die Kostenübernahme erfolgt nur, wenn die Schule bestätigt, 
                dass eine Lernförderung erforderlich ist. Dies geschieht in der Regel durch ein 
                Gutachten oder eine Bescheinigung der Schule.
              </p>
            </div>

            <div className="card">
              <h2 style={{ color: '#1e40af', marginBottom: '1rem' }}>Häufig gestellte Fragen (FAQ)</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Wer ist anspruchsberechtigt?</h3>
                <p>
                  Familien, die Leistungen nach SGB II, SGB XII, Asylbewerberleistungen, Wohngeld oder 
                  Kinderzuschlag erhalten. Das Kind muss eine Schule besuchen und unter 25 Jahre alt sein.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Welche Dokumente werden benötigt?</h3>
                <p>
                  In der Regel benötigen Sie:
                </p>
                <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
                  <li>Bescheid über die Leistungsberechtigung (z.B. ALG II Bescheid)</li>
                  <li>Schulbescheinigung</li>
                  <li>Bestätigung der Schule über Förderbedarf (bei Lernförderung)</li>
                  <li>Angebot eines Nachhilfeinstituts</li>
                </ul>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Welche Kosten werden übernommen?</h3>
                <p>
                  Die tatsächlich anfallenden Kosten für die Nachhilfe werden vollständig übernommen. 
                  Es gibt keine Eigenbeteiligung.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Wie beantrage ich die Lernförderung?</h3>
                <p>
                  Die Beantragung erfolgt bei Ihrem zuständigen Jobcenter oder der zuständigen Behörde 
                  (je nachdem, welche Leistung Sie beziehen). Sie können auch direkt bei uns eine 
                  Beratung erhalten und wir helfen Ihnen beim Antragsprozess.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Für welche Fächer kann ich Nachhilfe beantragen?</h3>
                <p>
                  Die Lernförderung kann für alle Fächer beantragt werden, in denen Ihr Kind 
                  Schwierigkeiten hat. Dies umfasst alle Schulfächer wie Mathematik, Deutsch, 
                  Englisch, Naturwissenschaften, Sprachen und mehr.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Wie lange dauert die Bearbeitung?</h3>
                <p>
                  Die Bearbeitungszeit variiert je nach Behörde, beträgt aber in der Regel 2-4 Wochen. 
                  Wir helfen Ihnen dabei, den Antrag korrekt zu stellen, um Verzögerungen zu vermeiden.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href="/" className="btn-primary-warm">
                Jetzt Anspruch prüfen
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

