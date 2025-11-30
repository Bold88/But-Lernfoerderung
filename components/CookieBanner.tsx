'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <p>
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
          Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu. 
          <a href="/datenschutz" style={{ marginLeft: '0.5rem', textDecoration: 'underline' }}>
            Mehr erfahren
          </a>
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button onClick={acceptCookies} className="btn btn-secondary">
          Akzeptieren
        </button>
        <button onClick={declineCookies} className="btn" style={{ backgroundColor: '#6b7280' }}>
          Ablehnen
        </button>
      </div>
    </div>
  )
}

