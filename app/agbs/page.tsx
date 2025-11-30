import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGBs | but-lernfoerderung.de',
  description: 'Allgemeine Geschäftsbedingungen für but-lernfoerderung.de',
}

export default function AGBsPage() {
  return (
    <>
      <Header />
      
      <main>
        <section style={{ background: 'white', padding: '5rem 2rem' }}>
          <div className="container-architect" style={{ maxWidth: '900px' }}>
            <div className="card-modern">
              <h1 style={{ 
                color: '#1a1a1a', 
                marginBottom: '1rem',
                fontSize: '2.5rem',
                fontWeight: 800,
                textAlign: 'center'
              }}>
                AGBs
              </h1>
              <h2 style={{ 
                color: '#6a6a6a', 
                marginBottom: '3rem',
                fontSize: '1.5rem',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                Allgemeine Geschäftsbedingungen (AGB)
              </h2>
              <p style={{ 
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: '#4a4a4a',
                marginBottom: '3rem',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                für die Plattform but-lernfoerderung.de
              </p>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 1 Geltungsbereich
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) Die nachfolgenden Allgemeinen Geschäftsbedingungen gelten für alle Verträge, Leistungen und Nutzungen der Plattform but-lernfoerderung.de.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (2) Betreiber der Plattform ist die Mini-Lernkreis GmbH, Hauptstraße 136, 33647 Bielefeld (im Folgenden „Anbieter").
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (3) Mit Nutzung der Plattform erkennt der Kunde diese AGB in der jeweils gültigen Fassung an.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 2 Plattform & Zweck
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) but-lernfoerderung.de ist eine Plattform der Mini-Lernkreis GmbH, die Eltern und Schüler/innen Informationen und Unterstützung rund um das Bildungs- und Teilhabepaket (BuT) bietet.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (2) Über die Plattform können Anfragen zur Lernförderung gestellt und – je nach Anspruch – an geeignete, verifizierte Nachhilfeinstitute weitergeleitet werden.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (3) Der Anbieter selbst führt nicht in allen Fällen den Unterricht durch, sondern vermittelt Anfragen ggf. an angeschlossene Partnerinstitute.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 3 Vertragsschluss
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) Mit Absenden einer Anfrage über die Plattform gibt der Kunde ein verbindliches Angebot zur Nutzung der vermittelten Leistungen ab.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (2) Ein Vertrag über Lernförderung kommt erst zustande, wenn ein Institut die Anfrage bestätigt und ein individueller Vertrag geschlossen wird.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (3) Für die Vertragsdurchführung gelten die Bedingungen des jeweiligen Instituts, an das die Anfrage vermittelt wird.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 4 Leistungen des Anbieters
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) Der Anbieter stellt die Plattform bereit und prüft, ob ein Anspruch auf Förderung nach dem Bildungs- und Teilhabepaket vorliegen könnte („BuT-Check").
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (2) Eine rechtliche Beratung oder verbindliche Entscheidung über Förderfähigkeit erfolgt nicht. Zuständig sind ausschließlich die Leistungsträger (z. B. Jobcenter, Sozialämter, Wohngeldstellen).
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (3) Der Anbieter bemüht sich um sorgfältige Auswahl der vermittelten Institute, übernimmt jedoch keine Garantie für deren Verfügbarkeit, Kapazität oder individuelle Leistungserfolge.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 5 Preise & Zahlungsbedingungen
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) Für die reine Nutzung der Plattform entstehen dem Kunden keine Kosten.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (2) Kosten für Nachhilfeunterricht entstehen nur, wenn ein Vertrag mit einem Nachhilfeinstitut abgeschlossen wird. Diese richten sich nach den Vereinbarungen zwischen Kunde und Institut sowie nach der Kostenübernahme durch den Leistungsträger.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (3) Der Anbieter ist berechtigt, selbst Verträge zur Lernförderung mit Kunden abzuschließen. In diesem Fall gelten die im Vertrag vereinbarten Preise und Zahlungsbedingungen.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 6 Widerrufsrecht
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) Verbraucher haben ein gesetzliches Widerrufsrecht nach Maßgabe der gesetzlichen Bestimmungen.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (2) <strong>Widerrufsbelehrung:</strong>
                </p>
                <div style={{ 
                  padding: '1.5rem',
                  background: '#f5f5f5',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  marginBottom: '1rem'
                }}>
                  <p style={{ 
                    fontSize: '1.0625rem',
                    lineHeight: '1.8',
                    color: '#4a4a4a',
                    marginBottom: '1rem'
                  }}>
                    Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen einen geschlossenen Vertrag zu widerrufen. Die Frist beginnt ab dem Tag des Vertragsabschlusses mit einem Nachhilfeinstitut oder direkt mit der Mini-Lernkreis GmbH.
                  </p>
                  <p style={{ 
                    fontSize: '1.0625rem',
                    lineHeight: '1.8',
                    color: '#4a4a4a',
                    marginBottom: '1rem'
                  }}>
                    Zur Ausübung genügt eine eindeutige Erklärung (z. B. per Brief oder E-Mail) an:
                  </p>
                  <p style={{ 
                    fontSize: '1.0625rem',
                    lineHeight: '1.8',
                    color: '#4a4a4a'
                  }}>
                    <strong>Mini-Lernkreis GmbH</strong>, Hauptstraße 136, 33647 Bielefeld, E-Mail: <a href="mailto:info@but-lernfoerderung.de" style={{ color: '#FF6B35' }}>info@but-lernfoerderung.de</a>
                  </p>
                </div>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (3) <strong>Folgen des Widerrufs:</strong><br />
                  Im Falle eines wirksamen Widerrufs werden bereits geleistete Zahlungen innerhalb von 14 Tagen erstattet. Für bereits erbrachte Unterrichtseinheiten kann eine anteilige Vergütung erhoben werden.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 7 Haftung
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) Die Mini-Lernkreis GmbH haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (2) Bei leichter Fahrlässigkeit haftet die Mini-Lernkreis GmbH nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und beschränkt auf den vertragstypischen, vorhersehbaren Schaden.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (3) Für die Leistungen von Partnerinstituten ist ausschließlich das jeweilige Institut verantwortlich.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 8 Datenschutz
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) Der Schutz personenbezogener Daten ist uns wichtig. Die Verarbeitung erfolgt nach Maßgabe der geltenden Datenschutzgesetze (DSGVO, BDSG).
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (2) Einzelheiten entnehmen Sie unserer <Link href="/datenschutz" style={{ color: '#FF6B35' }}>Datenschutzerklärung</Link> auf der Plattform.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 9 Änderungen der AGB
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  Die Mini-Lernkreis GmbH behält sich vor, diese AGB bei Bedarf zu ändern. Kunden werden über Änderungen in geeigneter Weise informiert.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ 
                  color: '#FF6B35', 
                  marginBottom: '1rem',
                  fontSize: '1.375rem',
                  fontWeight: 700
                }}>
                  § 10 Schlussbestimmungen
                </h3>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (1) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a',
                  marginBottom: '1rem'
                }}>
                  (2) Gerichtsstand ist, soweit gesetzlich zulässig, Bielefeld.
                </p>
                <p style={{ 
                  fontSize: '1.0625rem',
                  lineHeight: '1.8',
                  color: '#4a4a4a'
                }}>
                  (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                </p>
              </div>

              <div style={{ 
                marginTop: '4rem',
                padding: '2rem',
                background: '#f5f5f5',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid #e0e0e0'
              }}>
                <p style={{ 
                  fontSize: '1rem',
                  color: '#6a6a6a',
                  margin: 0,
                  fontWeight: 600
                }}>
                  Stand: September 2025
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

