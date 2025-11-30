'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Contact {
  id: string
  first_name: string
  last_name: string
  email: string
  city: string
  school_name?: string
  grade?: string
  subjects?: string[]
  status: string
  createdAt: string
  butAnswers?: Record<string, boolean>
  dob?: string
  street?: string
  house_no?: string
  zip?: string
  state?: string
  gov_support?: string
  disabilities?: string
  phone?: string
  message?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Check authentication
    const token = sessionStorage.getItem('admin_token')
    const expiresAt = sessionStorage.getItem('admin_expires')
    
    if (!token || !expiresAt) {
      router.push('/admin/login')
      return
    }

    // Check if token expired
    if (new Date(expiresAt) < new Date()) {
      sessionStorage.removeItem('admin_token')
      sessionStorage.removeItem('admin_user')
      sessionStorage.removeItem('admin_expires')
      router.push('/admin/login')
      return
    }

    fetchContacts()
  }, [router])

  const fetchContacts = async () => {
    try {
      const token = sessionStorage.getItem('admin_token')
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts || [])
      } else if (response.status === 401) {
        sessionStorage.removeItem('admin_token')
        sessionStorage.removeItem('admin_user')
        sessionStorage.removeItem('admin_expires')
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchContacts()
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status })
        }
      }
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('admin_authenticated')
    router.push('/admin/login')
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = filter === 'all' || contact.status === filter
    const matchesSearch = 
      contact.first_name.toLowerCase().includes(search.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.city.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const exportCSV = () => {
    const headers = ['ID', 'Vorname', 'Nachname', 'E-Mail', 'Stadt', 'Schule', 'Klasse', 'Fächer', 'Status', 'Datum']
    const rows = filteredContacts.map(contact => [
      contact.id,
      contact.first_name,
      contact.last_name,
      contact.email,
      contact.city,
      contact.school_name || '',
      contact.grade || '',
      contact.subjects?.join(', ') || '',
      contact.status,
      new Date(contact.createdAt).toLocaleDateString('de-DE')
    ])

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `kontakte-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Lade Anfragen...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff9f0' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ color: '#413a2d', margin: 0 }}>Admin Dashboard</h1>
          <p style={{ color: '#5a5449', margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
            {contacts.length} Anfrage{contacts.length !== 1 ? 'n' : ''} gesamt
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#F59E0B', textDecoration: 'none' }}>
            Zur Website
          </Link>
          <button
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Abmelden
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: '300px',
          background: 'white',
          borderRight: '1px solid #e5e7eb',
          padding: '2rem'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Suche
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, E-Mail, Stadt..."
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '2px solid #e5e7eb',
                borderRadius: '6px'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Status filtern
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(['all', 'new', 'contacted', 'completed'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  style={{
                    padding: '0.5rem',
                    background: filter === status ? '#F59E0B' : '#f3f4f6',
                    color: filter === status ? 'white' : '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    textTransform: 'capitalize'
                  }}
                >
                  {status === 'all' ? 'Alle' : status === 'new' ? 'Neu' : status === 'contacted' ? 'Kontaktiert' : 'Abgeschlossen'} 
                  ({status === 'all' ? contacts.length : contacts.filter(c => c.status === status).length})
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={exportCSV}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#16A34A',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Als CSV exportieren
          </button>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          {selectedContact ? (
            <div>
              <button
                onClick={() => setSelectedContact(null)}
                style={{
                  marginBottom: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                ← Zurück zur Übersicht
              </button>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                  <div>
                    <h2 style={{ color: '#413a2d', marginBottom: '0.5rem' }}>
                      {selectedContact.first_name} {selectedContact.last_name}
                    </h2>
                    <p style={{ color: '#5a5449', margin: 0 }}>{selectedContact.email}</p>
                  </div>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => updateContactStatus(selectedContact.id, e.target.value)}
                    style={{
                      padding: '0.5rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '6px'
                    }}
                  >
                    <option value="new">Neu</option>
                    <option value="contacted">Kontaktiert</option>
                    <option value="completed">Abgeschlossen</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                  <div>
                    <h3 style={{ color: '#413a2d', marginBottom: '1rem' }}>Persönliche Daten</h3>
                    <p><strong>Vorname:</strong> {selectedContact.first_name}</p>
                    <p><strong>Nachname:</strong> {selectedContact.last_name}</p>
                    <p><strong>E-Mail:</strong> {selectedContact.email}</p>
                    <p><strong>Geburtsdatum:</strong> {selectedContact.dob || 'Nicht angegeben'}</p>
                  </div>

                  <div>
                    <h3 style={{ color: '#413a2d', marginBottom: '1rem' }}>Adresse</h3>
                    <p><strong>Straße:</strong> {selectedContact.street} {selectedContact.house_no}</p>
                    <p><strong>PLZ:</strong> {selectedContact.zip}</p>
                    <p><strong>Ort:</strong> {selectedContact.city}</p>
                    <p><strong>Bundesland:</strong> {selectedContact.state || 'Nicht angegeben'}</p>
                  </div>

                  <div>
                    <h3 style={{ color: '#413a2d', marginBottom: '1rem' }}>Schule & Lernbedarf</h3>
                    <p><strong>Schule:</strong> {selectedContact.school_name || 'Nicht angegeben'}</p>
                    <p><strong>Klasse:</strong> {selectedContact.grade || 'Nicht angegeben'}</p>
                    <p><strong>Fächer:</strong> {selectedContact.subjects?.join(', ') || 'Nicht angegeben'}</p>
                    <p><strong>Staatliche Unterstützung:</strong> {selectedContact.gov_support || 'Nicht angegeben'}</p>
                  </div>
                </div>

                {selectedContact.butAnswers && Object.keys(selectedContact.butAnswers).length > 0 && (
                  <div style={{ marginTop: '2rem', padding: '1rem', background: '#eff6ff', borderRadius: '6px' }}>
                    <h3 style={{ color: '#413a2d', marginBottom: '1rem' }}>BuT-Check Ergebnisse</h3>
                    <ul style={{ marginLeft: '1.5rem' }}>
                      {Object.entries(selectedContact.butAnswers).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value ? 'Ja' : 'Nein'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '6px' }}>
                  <p><strong>Erstellt am:</strong> {new Date(selectedContact.createdAt).toLocaleString('de-DE')}</p>
                  <p><strong>ID:</strong> {selectedContact.id}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ color: '#413a2d', marginBottom: '1.5rem' }}>
                Kontaktanfragen ({filteredContacts.length})
              </h2>

              {filteredContacts.length === 0 ? (
                <div style={{
                  background: 'white',
                  padding: '3rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#5a5449' }}>Keine Anfragen gefunden.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredContacts.map(contact => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h3 style={{ color: '#413a2d', marginBottom: '0.5rem' }}>
                            {contact.first_name} {contact.last_name}
                          </h3>
                          <p style={{ color: '#5a5449', margin: '0.25rem 0' }}>{contact.email}</p>
                          <p style={{ color: '#5a5449', margin: '0.25rem 0' }}>
                            {contact.city} {contact.school_name && `• ${contact.school_name}`}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: contact.status === 'new' ? '#dbeafe' : 
                                       contact.status === 'contacted' ? '#fef3c7' : '#d1fae5',
                            color: contact.status === 'new' ? '#1e40af' : 
                                   contact.status === 'contacted' ? '#92400e' : '#065f46'
                          }}>
                            {contact.status === 'new' ? 'Neu' : 
                             contact.status === 'contacted' ? 'Kontaktiert' : 'Abgeschlossen'}
                          </span>
                          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            {new Date(contact.createdAt).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

