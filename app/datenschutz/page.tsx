import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | but-lernfoerderung.de',
  description: 'Datenschutzerklärung gemäß DSGVO',
}

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      
      <main>
        <section style={{ background: 'white', padding: '5rem 2rem' }}>
          <div className="container-warm" style={{ maxWidth: '900px' }}>
            <div className="card-modern">
              <h1 style={{ color: '#1e40af', marginBottom: '2rem' }}>Datenschutzerklärung</h1>
              
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>1. Datenschutz auf einen Blick</h2>
                
                <h3 style={{ color: '#6b7280', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>

                <h3 style={{ color: '#6b7280', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Datenerfassung auf dieser Website</h3>
                <p>
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen 
                  Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>2. Hosting</h2>
                <p>
                  Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die 
                  personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den 
                  Servern des Hosters gespeichert.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>3. Allgemeine Hinweise und Pflichtinformationen</h2>
                
                <h3 style={{ color: '#6b7280', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Datenschutz</h3>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den 
                  gesetzlichen Datenschutzbestimmungen sowie dieser Datenschutzerklärung.
                </p>

                <h3 style={{ color: '#6b7280', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Hinweis zur verantwortlichen Stelle</h3>
                <p>
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
                  [Ihr Name/Unternehmen]<br />
                  [Adresse]<br />
                  [Kontaktdaten]
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>4. Datenerfassung auf dieser Website</h2>
                
                <h3 style={{ color: '#6b7280', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Kontaktformular</h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
                  dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. 
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, 
                  sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur 
                  Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen 
                  beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven 
                  Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf 
                  Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>5. Ihre Rechte</h2>
                <p>Sie haben jederzeit das Recht:</p>
                <ul style={{ marginLeft: '2rem', marginTop: '0.5rem', lineHeight: '2' }}>
                  <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
                  <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                  <li>Löschung Ihrer bei uns gespeicherten Daten zu verlangen (Art. 17 DSGVO)</li>
                  <li>Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)</li>
                  <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen (Art. 21 DSGVO)</li>
                  <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
                  <li>Beschwerde bei einer Aufsichtsbehörde einzulegen (Art. 77 DSGVO)</li>
                </ul>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#374151', marginBottom: '1rem' }}>6. Cookies</h2>
                <p>
                  Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem 
                  Endgerät gespeichert werden. Sie können der Verwendung von Cookies widersprechen 
                  oder diese einschränken. Weitere Informationen finden Sie in unserer 
                  Cookie-Richtlinie.
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

