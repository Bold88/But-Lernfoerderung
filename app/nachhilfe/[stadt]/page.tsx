'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ButCheck from '@/components/ButCheck'
import ContactForm from '@/components/ContactForm'

export default function StadtLandingPage() {
  const params = useParams()
  const stadt = params?.stadt as string
  const stadtFormatted = stadt ? stadt.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : ''

  const [showForm, setShowForm] = useState(false)
  const [butAnswers, setButAnswers] = useState<Record<string, boolean>>({})

  const handleButCheckComplete = (answers: Record<string, boolean>) => {
    setButAnswers(answers)
    setShowForm(true)
  }

  // Beispiel-Testimonial für die Stadt
  const stadtTestimonial = `"Wir wohnen in ${stadtFormatted} und haben durch das BuT-Programm kostenlose Nachhilfe für unsere Tochter erhalten. Die Noten haben sich deutlich verbessert!"`

  return (
    <>
      <Header />
      
      <main>
        <section className="hero-warm" style={{ padding: '6rem 2rem' }}>
          <div className="container-warm">
            <div className="hero-content-warm" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
              <h1 className="hero-title-warm">Nachhilfe in {stadtFormatted} kostenlos durch Bildung und Teilhabe</h1>
              <p className="hero-subtitle-warm">
                Sichern Sie kostenlose Nachhilfe für Ihr Kind in {stadtFormatted}! 
                Mit dem Bildung und Teilhabe Programm können die Kosten für die Nachhilfe 
                vollständig übernommen werden.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                <a href="#but-check" className="btn-primary-warm">
                  Jetzt Anspruch prüfen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'white', padding: '5rem 2rem' }}>
          <div className="container-warm" style={{ maxWidth: '900px' }}>
            <div className="card-modern">
              <h2 style={{ color: '#1a1a1a', marginBottom: '1rem', fontSize: '2rem', fontWeight: 800 }}>
                Kostenlose Nachhilfe in {stadtFormatted}
              </h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.8', color: '#4a4a4a' }}>
                Viele Familien in {stadtFormatted} wissen nicht, dass sie Anspruch auf kostenlose 
                Nachhilfe durch das Bildung und Teilhabe Programm haben. Wenn Sie oder Ihr Kind 
                Leistungen nach SGB II, SGB XII, Asylbewerberleistungen, Wohngeld oder 
                Kinderzuschlag erhalten, könnte auch Ihr Kind kostenlose Nachhilfe erhalten.
              </p>

              <h3 style={{ color: '#FF6B35', marginBottom: '1rem', marginTop: '2rem', fontSize: '1.5rem', fontWeight: 700 }}>
                Was ist Bildung und Teilhabe?
              </h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.0625rem', lineHeight: '1.8', color: '#4a4a4a' }}>
                Das BuT-Programm ermöglicht es Kindern und Jugendlichen aus einkommensschwachen 
                Familien, am gesellschaftlichen Leben teilzunehmen. Dazu gehört auch die 
                Lernförderung (Nachhilfe) für alle Fächer, in denen Ihr Kind Schwierigkeiten hat.
              </p>

              <div style={{ marginTop: '2rem', padding: '2rem', background: '#f5f5f5', borderRadius: '16px', border: '2px solid #e0e0e0' }}>
                <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4a4a4a', fontStyle: 'italic', marginBottom: '1rem' }}>{stadtTestimonial}</p>
                <div style={{ color: '#FF6B35', fontWeight: 600 }}>- Familie aus {stadtFormatted}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="but-check" style={{ background: '#fafafa', padding: '5rem 2rem' }}>
          <div className="container-warm" style={{ maxWidth: '900px' }}>
            <h2 className="section-title-warm" style={{ textAlign: 'center', marginBottom: '3rem' }}>Prüfen Sie jetzt Ihren Anspruch</h2>
            {!showForm ? (
              <ButCheck onComplete={handleButCheckComplete} />
            ) : (
              <div>
                <div style={{ 
                  background: '#d1fae5', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#065f46', marginBottom: '0.5rem' }}>
                    ✓ Anspruchsprüfung abgeschlossen
                  </h3>
                  <p style={{ color: '#047857' }}>
                    Basierend auf Ihren Antworten könnten Sie Anspruch auf kostenlose Nachhilfe haben. 
                    Füllen Sie jetzt das Kontaktformular aus, um weitere Informationen zu erhalten.
                  </p>
                </div>
                <ContactForm butAnswers={butAnswers} />
              </div>
            )}
          </div>
        </section>

        <section style={{ background: 'white', padding: '5rem 2rem' }}>
          <div className="container-warm" style={{ maxWidth: '900px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 className="section-title-warm" style={{ marginBottom: '1.5rem' }}>Weitere Informationen</h2>
              <p className="section-description-warm" style={{ marginBottom: '2rem' }}>
                Möchten Sie mehr über das Bildung und Teilhabe Programm erfahren?
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/bildung-und-teilhabe" className="btn-primary-warm">
                  Mehr über BuT erfahren
                </a>
                <a href="/" className="btn-secondary-warm">
                  Zur Startseite
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

