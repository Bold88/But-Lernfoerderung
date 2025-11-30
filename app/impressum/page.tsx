import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | but-lernfoerderung.de',
  description: 'Impressum und Anbieterkennzeichnung',
}

export default function ImpressumPage() {
  return (
    <>
      <Header />
      
      <main>
        <section style={{ background: 'white', padding: '5rem 2rem' }}>
          <div className="container-architect" style={{ maxWidth: '900px' }}>
            <div className="card-modern">
              <h1 style={{ 
                color: '#1a1a1a', 
                marginBottom: '3rem',
                fontSize: '2.5rem',
                fontWeight: 800,
                textAlign: 'center'
              }}>
                Impressum
              </h1>
              
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  Angaben gemäß § 5 TMG
                </h2>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  <strong>Minilernkreis GmbH</strong><br />
                  Geschäftsführer: Bastian Knetsch & Bold Molor<br />
                  Hauptstraße 136<br />
                  33647 Bielefeld<br />
                  <br />
                  <strong>Website:</strong> <a href="https://www.minilernkreis.de" target="_blank" rel="noopener noreferrer" style={{ color: '#FF6B35' }}>www.minilernkreis.de</a>
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  Geschäftsinformationen
                </h2>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  <strong>Steuernummer:</strong> 5349/5744/5984<br />
                  <strong>HRB:</strong> 15052<br />
                  <strong>Amtsgericht:</strong> Schwerin<br />
                  <strong>Gläubiger-ID:</strong> DE42ZZZ00002734516
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  Bankverbindung
                </h2>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  <strong>IBAN:</strong> DE89 1405 2000 1711 8459 29<br />
                  <strong>BIC:</strong> NOLADE21LWL
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  Verantwortlich für den Inhalt
                </h2>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  i.S.d. MDStV § 55 Abs. 2 RStV<br />
                  <strong>Mini-Lernkreis GmbH</strong>
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  Haftungsausschluss (Disclaimer)
                </h2>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1.5rem'
                }}>
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.<br />
                  Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  Urheberrecht
                </h2>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht.<br />
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO
                </h2>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1.5rem'
                }}>
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#FF6B35', textDecoration: 'underline' }}
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  Unsere E-Mail-Adresse lautet: <a href="mailto:info@minilernkreis.de" style={{ color: '#FF6B35' }}>info@minilernkreis.de</a>
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
