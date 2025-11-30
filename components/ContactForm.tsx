'use client'

import { useState, FormEvent } from 'react'

interface ContactFormProps {
  butAnswers?: Record<string, boolean>
}

export default function ContactForm({ butAnswers }: ContactFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    street: '',
    house_no: '',
    zip: '',
    city: '',
    state: '',
    school_name: '',
    grade: '',
    subjects: [] as string[],
    gov_support: '',
    disabilities: '',
    consent: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
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
        alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.')
    }
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, subjects: [...formData.subjects, subject] })
    } else {
      setFormData({ ...formData, subjects: formData.subjects.filter(s => s !== subject) })
    }
  }

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem', background: 'white' }}>
        <h3 style={{ color: '#16A34A', marginBottom: '1rem', fontSize: '1.5rem' }}>✓ Vielen Dank!</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ 
      background: 'white', 
      padding: '2rem', 
      borderRadius: '8px',
      color: '#111'
    }}>
      <h3 style={{ marginBottom: '1.5rem', color: '#413a2d', fontSize: '1.5rem' }}>Kontaktformular</h3>
      
      {/* Persönliche Daten */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#413a2d', fontSize: '1.1rem' }}>Persönliche Daten</h4>
        
        <div className="form-group">
          <label htmlFor="first_name">Vorname des Schülers/der Schülerin *</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            required
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Nachname des Schülers/der Schülerin *</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            required
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-Mail *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Geburtsdatum *</label>
          <input
            type="date"
            id="dob"
            name="dob"
            required
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>
      </div>

      {/* Adresse */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#413a2d', fontSize: '1.1rem' }}>Adresse</h4>
        
        <div className="form-group">
          <label>Straße &amp; Hausnummer *</label>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem' }}>
            <input
              type="text"
              name="street"
              placeholder="Straße"
              required
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            />
            <input
              type="text"
              name="house_no"
              placeholder="Nr."
              required
              value={formData.house_no}
              onChange={(e) => setFormData({ ...formData, house_no: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>PLZ &amp; Ort *</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
            <input
              type="text"
              name="zip"
              placeholder="PLZ"
              pattern="\d{5}"
              inputMode="numeric"
              required
              value={formData.zip}
              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            />
            <input
              type="text"
              name="city"
              placeholder="Ort"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="state">Bundesland (optional)</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          >
            <option value="">— Bitte wählen —</option>
            <option value="Baden-Württemberg">Baden-Württemberg</option>
            <option value="Bayern">Bayern</option>
            <option value="Berlin">Berlin</option>
            <option value="Brandenburg">Brandenburg</option>
            <option value="Bremen">Bremen</option>
            <option value="Hamburg">Hamburg</option>
            <option value="Hessen">Hessen</option>
            <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
            <option value="Niedersachsen">Niedersachsen</option>
            <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
            <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
            <option value="Saarland">Saarland</option>
            <option value="Sachsen">Sachsen</option>
            <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
            <option value="Schleswig-Holstein">Schleswig-Holstein</option>
            <option value="Thüringen">Thüringen</option>
          </select>
        </div>
      </div>

      {/* Schule & Lernbedarf */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#413a2d', fontSize: '1.1rem' }}>Schule &amp; Lernbedarf</h4>
        
        <div className="form-group">
          <label htmlFor="school_name">Schulname *</label>
          <input
            type="text"
            id="school_name"
            name="school_name"
            required
            value={formData.school_name}
            onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
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

        <div className="form-group">
          <fieldset style={{ border: '2px solid #e5e7eb', borderRadius: '6px', padding: '1rem' }}>
            <legend style={{ padding: '0 0.5rem', fontWeight: 600 }}>Fächer (Mehrfachauswahl möglich)</legend>
            {['Deutsch', 'Mathematik', 'Englisch', 'Naturwissenschaften', 'Geschichte', 'Geographie'].map(subject => (
              <label key={subject} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="checkbox"
                  name="subjects[]"
                  value={subject}
                  checked={formData.subjects.includes(subject)}
                  onChange={(e) => handleSubjectChange(subject, e.target.checked)}
                />
                {subject}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="form-group">
          <fieldset style={{ border: '2px solid #e5e7eb', borderRadius: '6px', padding: '1rem' }}>
            <legend style={{ padding: '0 0.5rem', fontWeight: 600 }}>Erhält das Kind staatliche Unterstützung? *</legend>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="radio"
                name="gov_support"
                value="Ja"
                required
                checked={formData.gov_support === 'Ja'}
                onChange={(e) => setFormData({ ...formData, gov_support: e.target.value })}
              />
              Ja
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="radio"
                name="gov_support"
                value="Nein"
                checked={formData.gov_support === 'Nein'}
                onChange={(e) => setFormData({ ...formData, gov_support: e.target.value })}
              />
              Nein
            </label>
          </fieldset>
        </div>

        <div className="form-group">
          <label htmlFor="disabilities">Beeinträchtigungen / Besondere Bedürfnisse (optional)</label>
          <textarea
            id="disabilities"
            name="disabilities"
            rows={2}
            value={formData.disabilities}
            onChange={(e) => setFormData({ ...formData, disabilities: e.target.value })}
          />
        </div>
      </div>

      {/* BuT Answers */}
      {butAnswers && Object.keys(butAnswers).length > 0 && (
        <div style={{ 
          marginBottom: '1.5rem', 
          padding: '1rem', 
          background: '#eff6ff', 
          borderRadius: '6px',
          fontSize: '0.875rem'
        }}>
          <strong>BuT-Check Ergebnisse:</strong>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            {Object.entries(butAnswers).map(([key, value]) => (
              <li key={key}>
                {key === 'jobcenter' && 'Erhältst du Unterstützung vom Jobcenter?'}
                {key === 'sozialamt' && 'Erhältst du Leistungen vom Sozialamt oder der Wohngeldstelle?'}
                {key === 'kinderzuschlag' && 'Erhältst du zusätzlich zum Kindergeld einen Kinderzuschlag?'}
                {key === 'asylbLG' && 'Beziehst du Leistungen über das Asylbewerberleistungsgesetz?'}
                : {value ? 'Ja' : 'Nein'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Datenschutz */}
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="consent"
            required
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            style={{ marginTop: '0.25rem' }}
          />
          <span>
            Ich habe die <a href="/datenschutz" target="_blank" rel="noopener" style={{ color: '#F59E0B' }}>Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Daten einverstanden. *
          </span>
        </label>
      </div>

      <button type="submit" className="btn" style={{ width: '100%', fontSize: '1rem', padding: '0.85rem 1.5rem' }}>
        Jetzt kostenlose Nachhilfe anfragen
      </button>

      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
        * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nur zur Bearbeitung Ihrer Anfrage verwendet.
      </p>
    </form>
  )
}
