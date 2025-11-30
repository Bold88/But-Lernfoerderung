'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Token speichern
        sessionStorage.setItem('admin_token', data.token)
        sessionStorage.setItem('admin_user', JSON.stringify(data.user))
        sessionStorage.setItem('admin_expires', data.expiresAt)
        
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Ungültige Anmeldedaten')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Fehler beim Anmelden. Bitte versuchen Sie es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFF8F5 0%, #FFE5D9 100%)',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        maxWidth: '450px',
        width: '100%',
        border: '2px solid #FFE5D9'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            color: '#1a1a1a', 
            marginBottom: '0.5rem',
            fontSize: '2rem',
            fontWeight: 800
          }}>
            Admin Login
          </h1>
          <p style={{ 
            color: '#6a6a6a', 
            fontSize: '0.9375rem'
          }}>
            Bitte melden Sie sich mit Ihren Admin-Daten an
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#1a1a1a',
              fontWeight: 600,
              fontSize: '0.9375rem'
            }}>
              E-Mail-Adresse
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ihre.email@minilernkreis.de"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF6B35'
                e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 53, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#1a1a1a',
              fontWeight: 600,
              fontSize: '0.9375rem'
            }}>
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ihr Passwort"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF6B35'
                e.target.style.boxShadow = '0 0 0 4px rgba(255, 107, 53, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '0.875rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              border: '2px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.0625rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(255, 107, 53, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 107, 53, 0.3)'
              }
            }}
          >
            {loading ? 'Wird angemeldet...' : 'Anmelden'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f5f5f5',
          borderRadius: '12px',
          fontSize: '0.8125rem',
          color: '#6a6a6a',
          lineHeight: '1.6'
        }}>
          <strong style={{ color: '#1a1a1a' }}>Superadmin-Konten:</strong><br />
          • b.molor@minilernkreis.de<br />
          • b.knetsch@minilernkreis.de<br />
          <br />
          <em>Passwörter wurden beim ersten Start generiert und in data/admin-passwords.txt gespeichert.</em>
        </div>
      </div>
    </div>
  )
}
