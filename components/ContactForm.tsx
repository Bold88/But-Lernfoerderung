'use client'

import { useState, FormEvent } from 'react'

interface ContactFormProps {
  butAnswers?: Record<string, boolean>
}

export default function ContactForm({ butAnswers }: ContactFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    zip: '',
    email: '',
    phone: '',
    grade: '',
    consent: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const submissionData = {
      ...formData,
      butAnswers: butAnswers || {},
      timestamp: new Date().toISOString(),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="form-success-warm">
        <div className="success-icon-large-warm">✓</div>
        <h3>Vielen Dank für Ihre Anfrage!</h3>
        <p>
          Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form-warm">
      <h3 className="form-title-warm">Kontaktformular</h3>
      
      <div className="form-group">
        <label htmlFor="first_name">Vorname *</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          required
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          placeholder="Vorname eingeben"
        />
      </div>

      <div className="form-group">
        <label htmlFor="last_name">Nachname *</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          required
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          placeholder="Nachname eingeben"
        />
      </div>

      <div className="form-group">
        <label htmlFor="zip">Postleitzahl *</label>
        <input
          type="text"
          id="zip"
          name="zip"
          pattern="\d{5}"
          inputMode="numeric"
          maxLength={5}
          required
          value={formData.zip}
          onChange={(e) => setFormData({ ...formData, zip: e.target.value.replace(/\D/g, '') })}
          placeholder="12345"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-Mail-Adresse *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="ihre.email@beispiel.de"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Telefonnummer *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="0123 456789"
        />
      </div>

      <div className="form-group">
        <label htmlFor="grade">Klassenstufe *</label>
        <select
          id="grade"
          name="grade"
          required
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
        >
          <option value="">— Klassenstufe wählen —</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(grade => (
            <option key={grade} value={grade.toString()}>Klasse {grade}</option>
          ))}
        </select>
      </div>

      {/* BuT Answers - Anzeige (nur zur Info) */}
      {butAnswers && Object.keys(butAnswers).length > 0 && (
        <div className="but-answers-display">
          <strong>Ihre BuT-Check Antworten:</strong>
          <ul>
            {Object.entries(butAnswers).map(([key, value]) => (
              <li key={key}>
                {key === 'jobcenter' && 'Jobcenter: '}
                {key === 'sozialamt' && 'Sozialamt/Wohngeldstelle: '}
                {key === 'kinderzuschlag' && 'Kinderzuschlag: '}
                {key === 'asylbLG' && 'Asylbewerberleistungen: '}
                <strong>{value ? 'Ja' : 'Nein'}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Datenschutz */}
      <div className="form-group">
        <label className="consent-label">
          <input
            type="checkbox"
            name="consent"
            required
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          />
          <span>
            Ich habe die <a href="/datenschutz" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Daten einverstanden. *
          </span>
        </label>
      </div>

      <button 
        type="submit" 
        className="btn-primary-warm" 
        disabled={isSubmitting}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        {isSubmitting ? 'Wird gesendet...' : 'Jetzt kostenlose Nachhilfe anfragen'}
      </button>

      <p className="form-disclaimer">
        * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nur zur Bearbeitung Ihrer Anfrage verwendet.
      </p>
    </form>
  )
}
