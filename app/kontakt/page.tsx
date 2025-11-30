import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt | but-lernfoerderung.de',
  description: 'Kontaktieren Sie uns – wir helfen Ihnen gerne weiter',
}

export default function KontaktPage() {
  return (
    <>
      <Header />
      
      <main style={{ background: '#fafafa', minHeight: '80vh' }}>
        <section style={{ padding: '6rem 2rem' }}>
          <div className="container-warm" style={{ maxWidth: '900px' }}>
            <div className="section-header-warm" style={{ marginBottom: '4rem' }}>
              <span className="section-label-warm">Kontakt</span>
              <h1 className="section-title-warm">
                Wir sind für Sie da
              </h1>
              <p className="section-description-warm">
                Haben Sie Fragen zu unseren Angeboten oder möchten Sie eine individuelle Beratung? 
                Zögern Sie nicht, uns zu kontaktieren – <strong>wir helfen Ihnen gerne weiter!</strong>
              </p>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '3rem',
              marginBottom: '4rem'
            }}>
              {/* E-Mail Kontakt */}
              <div className="contact-card-warm">
                <div className="contact-icon-wrapper">
                  <span className="contact-icon">✉️</span>
                </div>
                <h2 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#1a1a1a'
                }}>
                  E-Mail
                </h2>
                <p style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1.5rem'
                }}>
                  Schreiben Sie uns eine E-Mail – wir antworten schnellstmöglich.
                </p>
                <a 
                  href="mailto:info@but-lernfoerderung.de" 
                  className="contact-link-warm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#FF6B35',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  info@but-lernfoerderung.de
                  <span style={{ fontSize: '1rem' }}>→</span>
                </a>
              </div>

              {/* Plattform-Info */}
              <div className="contact-card-warm">
                <div className="contact-icon-wrapper">
                  <span className="contact-icon">ℹ️</span>
                </div>
                <h2 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#1a1a1a'
                }}>
                  Plattform-Info
                </h2>
                <p style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1.5rem'
                }}>
                  Diese Plattform gehört zur <strong>Mini-Lernkreis GmbH</strong>
                </p>
                <div style={{ 
                  padding: '1.5rem',
                  background: '#f5f5f5',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0'
                }}>
                  <p style={{ 
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#4a4a4a',
                    margin: 0
                  }}>
                    <strong>Mini-Lernkreis GmbH</strong><br />
                    Hauptstr. 136<br />
                    33647 Bielefeld
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
              padding: '3rem',
              borderRadius: '24px',
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 12px 40px var(--shadow-warm)'
            }}>
              <h2 style={{ 
                fontSize: '1.75rem',
                fontWeight: 800,
                marginBottom: '1rem',
                color: 'white'
              }}>
                Noch Fragen?
              </h2>
              <p style={{ 
                fontSize: '1.125rem',
                lineHeight: '1.8',
                marginBottom: '2rem',
                opacity: 0.95
              }}>
                Wir sind gerne für Sie da und beantworten alle Ihre Fragen rund um Bildung & Teilhabe.
              </p>
              <a 
                href="mailto:info@but-lernfoerderung.de"
                className="btn-primary-warm"
                style={{
                  background: 'white',
                  color: '#FF6B35',
                  display: 'inline-block'
                }}
              >
                E-Mail schreiben
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

