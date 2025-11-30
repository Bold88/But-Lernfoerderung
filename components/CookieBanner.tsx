'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Kurze Verzögerung für bessere Sichtbarkeit
      setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
    // Hier könnten Sie zusätzlich Analytics-Cookies aktivieren
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner-container">
        <div className="cookie-banner-header">
          <div className="cookie-banner-icon">🍪</div>
          <h3 className="cookie-banner-title">Cookie-Einstellungen</h3>
        </div>
        
        <div className="cookie-banner-content">
          <p className="cookie-banner-text">
            <strong>Wir verwenden Cookies</strong> auf unserer Website, um Ihnen die bestmögliche Erfahrung zu bieten. 
            Einige Cookies sind für den Betrieb der Website notwendig, während andere uns helfen, diese Website und 
            die Nutzererfahrung zu verbessern (Statistik-Cookies).
          </p>
          
          {showDetails && (
            <div className="cookie-banner-details">
              <div className="cookie-detail-item">
                <strong>Notwendige Cookies:</strong>
                <p>Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.</p>
              </div>
              <div className="cookie-detail-item">
                <strong>Statistik-Cookies:</strong>
                <p>Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem Informationen anonym gesammelt und gemeldet werden.</p>
              </div>
              <p className="cookie-privacy-note">
                Weitere Informationen finden Sie in unserer{' '}
                <Link href="/datenschutz" className="cookie-link">Datenschutzerklärung</Link> und unseren{' '}
                <Link href="/cookie-policy" className="cookie-link">Cookie-Richtlinien</Link>.
              </p>
            </div>
          )}
        </div>

        <div className="cookie-banner-actions">
          <button 
            onClick={acceptNecessary} 
            className="cookie-btn cookie-btn-necessary"
          >
            Nur notwendige Cookies
          </button>
          <button 
            onClick={declineCookies} 
            className="cookie-btn cookie-btn-decline"
          >
            Alle ablehnen
          </button>
          <button 
            onClick={acceptCookies} 
            className="cookie-btn cookie-btn-accept"
          >
            Alle akzeptieren
          </button>
        </div>

        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="cookie-details-toggle"
        >
          {showDetails ? 'Weniger anzeigen' : 'Mehr Informationen'}
        </button>
      </div>
    </div>
  )
}
