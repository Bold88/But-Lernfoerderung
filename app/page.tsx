'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ButCheck from '@/components/ButCheck'
import ContactForm from '@/components/ContactForm'

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)
  const [butAnswers, setButAnswers] = useState<Record<string, boolean>>({})
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  // Scroll-Animationen mit Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
        }
      })
    }, observerOptions)

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const handleButCheckComplete = (answers: Record<string, boolean>) => {
    setButAnswers(answers)
    setShowForm(true)
    setTimeout(() => {
      const formElement = document.getElementById('leadFormMount')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }

  return (
    <>
      <Header />
      
      <main className="main-warm">
        {/* ============================================
            VERKAUFSFUNNEL STEP 1: HERO - Emotionale Ansprache
            ============================================ */}
        <section 
          className="hero-warm hero-with-image-right"
          ref={(el) => { sectionsRef.current[0] = el }}
        >
          <div className="hero-container-warm">
            <div className="hero-content-warm">
              <div className="hero-text-wrapper">
              <div className="hero-badge-warm">✨ Kostenlose Lernförderung für Ihr Kind</div>
              <h1 className="hero-title-warm">
                Geben Sie Ihrem Kind die Chance, 
                <br />
                <span className="gradient-warm">die es verdient</span>
              </h1>
              <p className="hero-subtitle-warm">
                <strong>Viele Eltern wissen es nicht:</strong> Sie haben möglicherweise Anspruch auf 
                <strong> vollständig kostenlose Nachhilfe</strong> für Ihr Kind. Prüfen Sie jetzt in nur 
                60 Sekunden, ob auch Sie profitieren können – ohne komplizierte Formulare oder lange Wartezeiten.
              </p>
              
              {/* Social Proof */}
              <div className="social-proof-warm">
                <div className="proof-item">
                  <span className="proof-number">2.847</span>
                  <span className="proof-label">Eltern haben bereits geprüft</span>
                </div>
                <div className="proof-item">
                  <span className="proof-number">94%</span>
                  <span className="proof-label">erhalten eine Rückmeldung</span>
                </div>
                <div className="proof-item">
                  <span className="proof-number">100%</span>
                  <span className="proof-label">kostenlos & unverbindlich</span>
                </div>
              </div>

              <div className="hero-cta-group-warm">
                <a href="#but-check" className="btn-primary-warm">
                  🎯 Jetzt kostenlos prüfen – nur 60 Sekunden
                </a>
                <a href="#info" className="btn-secondary-warm">
                  Mehr über die Förderung erfahren
                </a>
              </div>

              <div className="hero-trust-warm">
                <div className="trust-badge-warm">
                  <span className="trust-icon-warm">🔒</span>
                  <span>DSGVO-konform & sicher</span>
                </div>
                <div className="trust-badge-warm">
                  <span className="trust-icon-warm">⚡</span>
                  <span>Sofortige Prüfung möglich</span>
                </div>
                <div className="trust-badge-warm">
                  <span className="trust-icon-warm">💯</span>
                  <span>100% kostenlos für Sie</span>
                </div>
              </div>
              </div>
              <div className="hero-image-wrapper">
                <div className="hero-image-container">
                  <img 
                    src="/hero-background.jpg" 
                    alt="Lernförderung für Kinder" 
                    className="hero-image-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            VERKAUFSFUNNEL STEP 2: PROBLEM-LÖSUNG
            ============================================ */}
        <section 
          className="problem-section-warm"
          ref={(el) => { sectionsRef.current[1] = el }}
        >
          <div className="container-warm">
            <div className="problem-content">
              <h2 className="section-title-warm">
                Ihr Kind kämpft in der Schule? 
                <br />
                <span className="highlight-warm">Sie müssen nicht allein kämpfen</span>
              </h2>
              <p className="section-subtitle-warm">
                Viele Eltern stehen vor der gleichen Herausforderung: Ihr Kind braucht Unterstützung, 
                aber professionelle Nachhilfe ist teuer. <strong>Das muss nicht sein.</strong>
              </p>
              
              <div className="problem-grid-warm">
                <div className="problem-card-warm">
                  <div className="problem-icon">😔</div>
                  <h3>Ohne Förderung</h3>
                  <ul>
                    <li>Ihr Kind bleibt zurück</li>
                    <li>Noten verschlechtern sich</li>
                    <li>Selbstvertrauen leidet</li>
                    <li>Schulstress nimmt zu</li>
                  </ul>
                </div>
                <div className="solution-card-warm">
                  <div className="solution-icon">😊</div>
                  <h3>Mit BuT-Förderung</h3>
                  <ul>
                    <li>Ihr Kind holt auf</li>
                    <li>Noten verbessern sich</li>
                    <li>Selbstvertrauen wächst</li>
                    <li>Schule macht wieder Spaß</li>
                  </ul>
                </div>
              </div>

              <div className="cta-box-warm">
                <p className="cta-text-warm">
                  <strong>Geben Sie Ihrem Kind die Chance, die es verdient.</strong> 
                  Prüfen Sie jetzt kostenlos, ob Sie Anspruch haben.
                </p>
                <a href="#but-check" className="btn-primary-warm">
                  🎯 Jetzt kostenlos prüfen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            VERKAUFSFUNNEL STEP 3: INFORMATION - Was ist BuT?
            ============================================ */}
        <section 
          id="info" 
          className="info-section-warm"
          ref={(el) => { sectionsRef.current[2] = el }}
        >
          <div className="container-warm">
            <div className="section-header-warm">
              <span className="section-label-warm">Alles, was Sie wissen müssen</span>
              <h2 className="section-title-warm">
                Was ist Bildung & Teilhabe? 
                <br />
                <span className="highlight-warm">Ihre Chance auf kostenlose Nachhilfe</span>
              </h2>
              <p className="section-description-warm">
                Das Bildungs- und Teilhabepaket (BuT) ist eine <strong>staatliche Förderung</strong>, 
                die Kindern und Jugendlichen hilft, die in der Schule Unterstützung brauchen. 
                <strong> Für Sie bedeutet das: Professionelle Nachhilfe, die vollständig finanziert wird.</strong>
              </p>
            </div>

            <div className="info-grid-warm-improved">
              <div className="info-card-warm-large">
                <div className="card-icon-large">👥</div>
                <div className="card-number-warm">01</div>
                <h3>Wer hat Anspruch?</h3>
                <p>
                  <strong>Sie haben Anspruch, wenn Sie:</strong> Bürgergeld, Sozialhilfe, Wohngeld, 
                  Kinderzuschlag oder Asylbewerberleistungen beziehen. Zusätzlich muss die Schule 
                  bestätigen, dass Lernförderung notwendig ist – das ist in den meisten Fällen kein Problem.
                </p>
                <div className="card-cta-warm">
                  <a href="#but-check">Jetzt prüfen →</a>
                </div>
              </div>

              <div className="info-card-warm-large">
                <div className="card-icon-large">🎁</div>
                <div className="card-number-warm">02</div>
                <h3>Welche Leistungen gibt es?</h3>
                <p>
                  <strong>Die Lernförderung (Nachhilfe) wird vollständig finanziert.</strong> 
                  Gefördert werden alle Fächer, die für die schulische Entwicklung wichtig sind: 
                  Mathematik, Deutsch, Naturwissenschaften und mehr.
                </p>
                <div className="card-cta-warm">
                  <a href="#but-check">Mehr erfahren →</a>
                </div>
              </div>

              <div className="info-card-warm-large">
                <div className="card-icon-large">✨</div>
                <div className="card-number-warm">03</div>
                <h3>Was bringt es konkret?</h3>
                <p>
                  <strong>Ihr Kind erhält qualifizierte Nachhilfe</strong>, um Wissenslücken zu schließen, 
                  am Unterricht dranzubleiben und die Noten zu stabilisieren oder zu verbessern. 
                  <strong> Ohne dass Sie einen Cent bezahlen müssen.</strong>
                </p>
                <div className="card-cta-warm">
                  <a href="#but-check">Jetzt starten →</a>
                </div>
              </div>

              <div className="info-card-warm-large">
                <div className="card-icon-large">🚀</div>
                <div className="card-number-warm">04</div>
                <h3>Wie läuft der Prozess?</h3>
                <p>
                  <strong>Ganz einfach:</strong> Prüfen Sie hier Ihren Anspruch (60 Sekunden), geben Sie 
                  Ihre Kontaktdaten an, und wir vermitteln Sie an geprüfte Institute in Ihrer Region. 
                  <strong> Meist erhalten Sie innerhalb von 24–48 Stunden eine Rückmeldung.</strong>
                </p>
                <div className="card-cta-warm">
                  <a href="#but-check">Los geht's →</a>
                </div>
              </div>
            </div>

            {/* Urgency Element */}
            <div className="urgency-box-warm">
              <div className="urgency-icon">⏰</div>
              <div className="urgency-content">
                <h3>Warten Sie nicht zu lange</h3>
                <p>
                  Je früher Ihr Kind Unterstützung erhält, desto schneller kann es aufholen. 
                  <strong> Jede Woche zählt.</strong> Starten Sie jetzt – es kostet Sie nichts.
                </p>
              </div>
              <a href="#but-check" className="btn-primary-warm">
                Jetzt starten
              </a>
            </div>
          </div>
        </section>

        {/* ============================================
            VERKAUFSFUNNEL STEP 4: CHECK - Interaktion
            ============================================ */}
        <section 
          id="but-check" 
          className="check-section-warm"
          ref={(el) => { sectionsRef.current[3] = el }}
        >
          <div className="container-warm">
            <div className="check-wrapper-warm">
              <div className="check-header-warm">
                <span className="section-label-warm">Kostenlose Anspruchsprüfung</span>
                <h2 className="section-title-warm">
                  BuT-Check: Hat Ihr Kind Anspruch?
                </h2>
                <p className="section-description-warm">
                  <strong>Beantworten Sie 4 einfache Fragen in nur 60 Sekunden.</strong> 
                  Wir leiten Ihre Anfrage inklusive relevanter Antworten an ein geprüftes Institut weiter. 
                  <strong> Keine Verpflichtungen, keine Kosten.</strong>
                </p>
              </div>

              {!showForm ? (
                <div className="check-container-warm">
                  <ButCheck onComplete={handleButCheckComplete} />
                </div>
              ) : (
                <div className="check-result-warm">
                  <div className="result-success-warm">
                    <div className="success-icon-large-warm">🎉</div>
                    <h3>Herzlichen Glückwunsch!</h3>
                    <p className="result-main-text">
                      Basierend auf Ihren Antworten <strong>könnten Sie Anspruch auf kostenlose Nachhilfe haben.</strong>
                    </p>
                    <p className="result-sub-text">
                      Füllen Sie jetzt das Kontaktformular aus, und wir vermitteln Sie an ein geprüftes 
                      Institut in Ihrer Nähe. <strong>Meist erhalten Sie innerhalb von 24–48 Stunden eine Rückmeldung.</strong>
                    </p>
                  </div>
                  <div className="result-form-warm">
                    <ContactForm butAnswers={butAnswers} />
                  </div>
                </div>
              )}

              <div className="check-benefits-warm-improved">
                <h3>Was Sie jetzt erhalten:</h3>
                <div className="benefits-grid-improved">
                  <div className="benefit-card-improved">
                    <div className="benefit-icon-improved">🎯</div>
                    <h4>Kostenlose Anspruchsprüfung</h4>
                    <p>Vollständig kostenlos und unverbindlich</p>
                  </div>
                  <div className="benefit-card-improved">
                    <div className="benefit-icon-improved">✓</div>
                    <h4>Vermittlung an geprüfte Institute</h4>
                    <p>Nur verifizierte Partner in Ihrer Region</p>
                  </div>
                  <div className="benefit-card-improved">
                    <div className="benefit-icon-improved">🤝</div>
                    <h4>Persönliche Betreuung</h4>
                    <p>Wir helfen Ihnen bei jedem Schritt</p>
                  </div>
                  <div className="benefit-card-improved">
                    <div className="benefit-icon-improved">💯</div>
                    <h4>Keine versteckten Kosten</h4>
                    <p>100% transparent und ehrlich</p>
                  </div>
                </div>
              </div>

              <p className="check-disclaimer-warm">
                ⚠️ Hinweis: Der Kurzcheck ersetzt keine behördliche Entscheidung, hilft aber bei der schnellen Einschätzung.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            VERKAUFSFUNNEL STEP 5: VERTRAUEN & SOCIAL PROOF
            ============================================ */}
        <section 
          className="benefits-section-warm"
          ref={(el) => { sectionsRef.current[4] = el }}
        >
          <div className="container-warm">
            <div className="section-header-warm">
              <span className="section-label-warm">Ihre Vorteile</span>
              <h2 className="section-title-warm">
                Warum über uns? 
                <br />
                <span className="highlight-warm">Wir machen es Ihnen einfach</span>
              </h2>
              <p className="section-description-warm">
                Wir machen den Prozess so einfach wie möglich und vermitteln Sie an geprüfte Partner. 
                <strong> Sie müssen sich um nichts kümmern – wir übernehmen die Arbeit für Sie.</strong>
              </p>
            </div>

            {/* Hero Card für "Warum über uns" */}
            <div className="why-us-hero">
              <div className="why-us-content">
                <h3>Ihr Partner für erfolgreiche Lernförderung</h3>
                <p>
                  Wir verstehen, dass Sie als Eltern bereits genug um die Ohren haben. Deshalb übernehmen 
                  wir die komplette Vermittlung und Organisation für Sie. <strong>Von der Anspruchsprüfung 
                  bis zur ersten Nachhilfestunde – wir sind für Sie da.</strong>
                </p>
                <div className="why-us-stats">
                  <div className="why-us-stat">
                    <div className="stat-number-large">2.847+</div>
                    <div className="stat-label-large">Zufriedene Familien</div>
                  </div>
                  <div className="why-us-stat">
                    <div className="stat-number-large">94%</div>
                    <div className="stat-label-large">Erfolgsquote</div>
                  </div>
                  <div className="why-us-stat">
                    <div className="stat-number-large">24-48h</div>
                    <div className="stat-label-large">Schnelle Vermittlung</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="benefits-grid-warm">
              <div className="benefit-card-warm">
                <div className="benefit-icon-wrapper-warm">
                  <span className="benefit-icon-warm">✓</span>
                </div>
                <h3>Geprüfte Anbieter</h3>
                <p>
                  <strong>Nur verifizierte Nachhilfeinstitute in Ihrer Region.</strong> 
                  Qualität statt Zufall – wir prüfen jeden Partner sorgfältig.
                </p>
              </div>

              <div className="benefit-card-warm">
                <div className="benefit-icon-wrapper-warm">
                  <span className="benefit-icon-warm">🎓</span>
                </div>
                <h3>Qualifizierte Lehrkräfte</h3>
                <p>
                  <strong>Erfahrene Fachkräfte, die gezielt auf die Förderung von Kindern spezialisiert sind.</strong> 
                  Ihr Kind ist in besten Händen.
                </p>
              </div>

              <div className="benefit-card-warm">
                <div className="benefit-icon-wrapper-warm">
                  <span className="benefit-icon-warm">🏫</span>
                </div>
                <h3>Schulnahe Förderung</h3>
                <p>
                  <strong>Die Nachhilfe kann direkt an der Schule oder in der Nähe stattfinden.</strong> 
                  Optimal abgestimmt auf den Unterricht – keine langen Wege.
                </p>
              </div>

              <div className="benefit-card-warm">
                <div className="benefit-icon-wrapper-warm">
                  <span className="benefit-icon-warm">⚡</span>
                </div>
                <h3>Schnelle Vermittlung</h3>
                <p>
                  <strong>Meist erhalten Sie innerhalb von 24–48 Stunden eine Rückmeldung</strong> 
                  von einem Institut in Ihrer Nähe. Keine langen Wartezeiten.
                </p>
              </div>
            </div>

            {/* Testimonials - Spektakulär & Interessant */}
            <div className="testimonials-spectacular">
              <div className="testimonial-featured">
                <div className="testimonial-avatar">👩‍👧</div>
                <div className="testimonial-rating-large">⭐⭐⭐⭐⭐</div>
                <div className="testimonial-quote-icon">"</div>
                <blockquote className="testimonial-text-large">
                  <strong>Dank der Bildungs- und Teilhabe-Förderung konnte unsere Tochter endlich gezielt 
                  Nachhilfe in Mathe bekommen.</strong> Wir hätten uns das sonst nicht leisten können. 
                  Schon nach wenigen Wochen hat sie wieder mehr Selbstvertrauen und bessere Noten. 
                  <strong> Es hat wirklich alles verändert.</strong>
                </blockquote>
                <div className="testimonial-author-featured">
                  <div className="author-name">Sarah M.</div>
                  <div className="author-role">Mutter • München</div>
                  <div className="author-result">Noten verbessert: Mathe 5 → 2</div>
                </div>
              </div>

              <div className="testimonials-grid-compact">
                <div className="testimonial-compact">
                  <div className="testimonial-header-compact">
                    <div className="testimonial-avatar-small">👦</div>
                    <div className="testimonial-rating-compact">⭐⭐⭐⭐⭐</div>
                  </div>
                  <blockquote>
                    <strong>Mit der Unterstützung durch BuT habe ich Nachhilfe in Deutsch bekommen.</strong> 
                    Jetzt verstehe ich Texte viel besser und traue mich auch, im Unterricht mehr zu sagen. 
                    <strong> Schule macht mir jetzt wieder Spaß!</strong>
                  </blockquote>
                  <div className="testimonial-author-compact">
                    <strong>Max K.</strong>
                    <span>Schüler • Berlin</span>
                  </div>
                </div>

                <div className="testimonial-compact">
                  <div className="testimonial-header-compact">
                    <div className="testimonial-avatar-small">👨‍👩‍👧‍👦</div>
                    <div className="testimonial-rating-compact">⭐⭐⭐⭐⭐</div>
                  </div>
                  <blockquote>
                    <strong>Die Lernförderung über BuT hat uns sehr entlastet.</strong> Es war unkompliziert, 
                    einen Gutschein über das Jobcenter zu bekommen. Unsere beiden Kinder erhalten Nachhilfe 
                    in Mathe und Englisch – <strong>wir sehen schon deutliche Fortschritte.</strong>
                  </blockquote>
                  <div className="testimonial-author-compact">
                    <strong>Familie Schmidt</strong>
                    <span>Hamburg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA nach Testimonials */}
            <div className="cta-after-testimonials">
              <h3>Lassen Sie auch Ihr Kind von dieser Förderung profitieren</h3>
              <p>Prüfen Sie jetzt kostenlos, ob Sie Anspruch haben – es dauert nur 60 Sekunden.</p>
              <a href="#but-check" className="btn-primary-warm">
                🎯 Jetzt kostenlos prüfen
              </a>
            </div>
          </div>
        </section>

        {/* ============================================
            VERKAUFSFUNNEL STEP 6: LEAD-FORMULAR - Konversion
            ============================================ */}
        <section 
          id="leadFormMount"
          className="lead-section-warm"
          ref={(el) => { sectionsRef.current[5] = el }}
        >
          <div className="container-warm">
            <div className="lead-wrapper-warm">
              <div className="lead-header-warm">
                <span className="section-label-warm">Letzter Schritt</span>
                <h2 className="section-title-warm">
                  Jetzt Nachhilfe für Ihr Kind anfragen
                </h2>
                <p className="section-description-warm">
                  <strong>Wir vermitteln Sie an verifizierte Institute in Ihrer Nähe.</strong> 
                  Wir melden uns persönlich bei Ihnen und helfen Ihnen beim nächsten Schritt. 
                  <strong> Keine Verpflichtungen, keine Kosten – nur die Chance für Ihr Kind.</strong>
                </p>
              </div>

              <div className="lead-form-container-warm">
                {showForm ? (
                  <div>
                    <div className="form-intro-warm">
                      <h3>🎉 Fast geschafft!</h3>
                      <p>
                        Füllen Sie jetzt das Formular aus, und wir vermitteln Sie an ein geprüftes 
                        Institut in Ihrer Nähe. <strong>Meist erhalten Sie innerhalb von 24–48 Stunden eine Rückmeldung.</strong>
                      </p>
                    </div>
                    <ContactForm butAnswers={butAnswers} />
                  </div>
                ) : (
                  <div className="lead-prompt-warm">
                    <div className="prompt-icon">📝</div>
                    <h3>Bereit für den nächsten Schritt?</h3>
                    <p>
                      Bitte führen Sie zuerst den BuT-Check durch, um das Kontaktformular zu sehen. 
                      <strong> Es dauert nur 60 Sekunden und ist vollständig kostenlos.</strong>
                    </p>
                    <a href="#but-check" className="btn-primary-warm">
                      🎯 Zum BuT-Check
                    </a>
                  </div>
                )}
              </div>

              {/* Final CTA Box */}
              <div className="final-cta-warm">
                <h3>Geben Sie Ihrem Kind die Chance, die es verdient</h3>
                <p>
                  <strong>Jede Woche zählt.</strong> Je früher Ihr Kind Unterstützung erhält, 
                  desto schneller kann es aufholen. Starten Sie jetzt – es kostet Sie nichts.
                </p>
                <a href="#but-check" className="btn-primary-warm">
                  🎯 Jetzt kostenlos prüfen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            VERKAUFSFUNNEL STEP 7: FAQ - Letzte Bedenken
            ============================================ */}
        <section 
          className="faq-section-warm"
          ref={(el) => { sectionsRef.current[6] = el }}
        >
          <div className="container-warm">
            <div className="section-header-warm">
              <span className="section-label-warm">Häufige Fragen</span>
              <h2 className="section-title-warm">
                Noch Fragen? 
                <br />
                <span className="highlight-warm">Wir beantworten sie gerne</span>
              </h2>
            </div>

            <div className="faq-grid-warm">
              <details className="faq-item-warm">
                <summary>
                  Welche Fächer werden gefördert?
                  <span className="faq-icon-warm">+</span>
                </summary>
                <div className="faq-content-warm">
                  <p>
                    <strong>Gefördert wird, was Ihr Kind für seine schulische Entwicklung braucht.</strong> 
                    Typische Schwerpunkte sind Mathematik, Deutsch und Naturwissenschaften. 
                    Je nach Bedarf auch andere Schulfächer, wenn die Schule es befürwortet.
                  </p>
                </div>
              </details>

              <details className="faq-item-warm">
                <summary>
                  Wie lange dauert die Bearbeitung?
                  <span className="faq-icon-warm">+</span>
                </summary>
                <div className="faq-content-warm">
                  <p>
                    <strong>Meist erhalten Sie innerhalb von 24–48 Stunden eine Rückmeldung</strong> 
                    von einem geprüften Institut in Ihrer Region. Wir vermitteln Sie schnell und unkompliziert.
                  </p>
                </div>
              </details>

              <details className="faq-item-warm">
                <summary>
                  Was kostet die Nachhilfe?
                  <span className="faq-icon-warm">+</span>
                </summary>
                <div className="faq-content-warm">
                  <p>
                    <strong>Wenn die Voraussetzungen erfüllt sind, wird die Lernförderung vollständig finanziert.</strong> 
                    Für Sie entstehen in der Regel keine Kosten. Die Förderung wird durch das 
                    Bildungs- und Teilhabepaket übernommen.
                  </p>
                </div>
              </details>

              <details className="faq-item-warm">
                <summary>
                  Wo findet die Nachhilfe statt?
                  <span className="faq-icon-warm">+</span>
                </summary>
                <div className="faq-content-warm">
                  <p>
                    <strong>Die Nachhilfe kann direkt an der Schule oder in der Nähe stattfinden.</strong> 
                    Wir arbeiten eng mit Schulen zusammen und berücksichtigen den schulischen Kontext. 
                    Keine langen Wege für Sie oder Ihr Kind.
                  </p>
                </div>
              </details>
            </div>

            {/* Final CTA nach FAQ */}
            <div className="cta-after-faq">
              <h3>Bereit, Ihrem Kind zu helfen?</h3>
              <p>Prüfen Sie jetzt kostenlos, ob Sie Anspruch haben – es dauert nur 60 Sekunden.</p>
              <a href="#but-check" className="btn-primary-warm">
                🎯 Jetzt kostenlos prüfen
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
