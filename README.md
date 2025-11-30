# but-lernfoerderung.de

Website für kostenlose Nachhilfe durch Bildung und Teilhabe (BuT) Programm in Deutschland.

## 🎯 Projektübersicht

Diese Website dient als zentrale Plattform für Eltern und Erziehungsberechtigte, die nachhilfe durch das Bildung und Teilhabe (BuT) Programm suchen. Das Hauptziel ist es, Aufmerksamkeit zu generieren, Vertrauen aufzubauen und Kontaktanfragen (Leads) zu generieren.

## ✨ Features

### Hauptfunktionen
- **Homepage** mit emotionaler Einführung und starken Call-to-Actions
- **BuT-Eligibility-Check** - Interaktiver Fragebogen zur Anspruchsprüfung
- **Kontaktformular** - Automatische Integration der BuT-Check-Ergebnisse
- **Info-Seite** - Umfassende Informationen über Bildung & Teilhabe mit FAQ
- **Landing Pages** - Dynamische Seiten für ~350 Städte/Regionen
- **Rechtliche Seiten** - Impressum, Datenschutz (DSGVO-konform), Cookie-Policy
- **Cookie-Consent-Banner** - DSGVO-konformes Cookie-Banner

### Technische Features
- ✅ SEO-optimiert (Meta-Tags, Sitemap, Robots.txt)
- ✅ Responsive Design (Desktop, Tablet, Mobile)
- ✅ Schnelle Ladezeiten
- ✅ TypeScript für Type-Safety
- ✅ Moderne UI mit CSS

## 📁 Projektstruktur

```
but-lernfoerderung/
├── app/
│   ├── api/
│   │   └── contact/          # API Route für Kontaktformular
│   ├── bildung-und-teilhabe/  # Info-Seite über BuT
│   ├── nachhilfe/
│   │   └── [stadt]/           # Dynamische Landing Pages für Städte
│   ├── impressum/             # Impressum
│   ├── datenschutz/           # Datenschutzerklärung
│   ├── cookie-policy/         # Cookie-Richtlinie
│   ├── layout.tsx             # Root Layout
│   ├── page.tsx               # Homepage
│   ├── globals.css            # Globale Styles
│   ├── sitemap.ts             # Sitemap Generator
│   └── robots.ts              # Robots.txt
├── components/
│   ├── ButCheck.tsx           # BuT-Eligibility-Check Komponente
│   ├── ContactForm.tsx        # Kontaktformular
│   ├── CookieBanner.tsx       # Cookie-Consent-Banner
│   ├── Header.tsx             # Header/Navigation
│   └── Footer.tsx             # Footer
├── scripts/
│   └── generate-city-pages.js # Script zur Generierung von Stadt-Listen
└── package.json
```

## 🚀 Installation

```bash
# Dependencies installieren
npm install
```

## 💻 Entwicklung

```bash
# Development Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 🏗️ Build

```bash
# Production Build erstellen
npm run build

# Production Server starten
npm start
```

## 📝 Wichtige Hinweise

### Vor dem Deployment

1. **Impressum aktualisieren**
   - Öffnen Sie `app/impressum/page.tsx`
   - Ersetzen Sie die Platzhalter mit Ihren echten Firmendaten

2. **Datenschutz aktualisieren**
   - Öffnen Sie `app/datenschutz/page.tsx`
   - Aktualisieren Sie die Kontaktdaten und Details

3. **Kontaktformular Backend**
   - Das Kontaktformular sendet aktuell an `/api/contact`
   - Integrieren Sie einen E-Mail-Service (SendGrid, Resend, etc.)
   - Oder leiten Sie die Anfragen an Ihr CRM-System weiter

4. **Stadt-Landing-Pages**
   - Die dynamische Route `/nachhilfe/[stadt]` funktioniert für alle Städte
   - Führen Sie `node scripts/generate-city-pages.js` aus, um eine Liste zu generieren
   - Erweitern Sie die Städte-Liste im Script nach Bedarf

## 🔧 Technologie-Stack

- **Next.js 14** - React Framework mit App Router
- **TypeScript** - Type-Safety
- **React 18** - UI Library
- **CSS** - Custom Styling (keine externe CSS-Bibliothek)

## 📊 SEO-Features

- Meta-Tags für alle Seiten
- Dynamische Meta-Tags für Stadt-Landing-Pages
- Sitemap.xml Generator
- Robots.txt
- Semantisches HTML
- Optimierte Ladezeiten

## 🎨 Design-Features

- Moderne, vertrauenswürdige UI
- Emotionale Storytelling-Elemente
- Starke Call-to-Action Buttons
- Responsive Design für alle Geräte
- Barrierefreie Farbkontraste

## 📧 Kontaktformular

Das Kontaktformular:
- Integriert automatisch die BuT-Check-Ergebnisse
- Sendet alle relevanten Informationen
- Zeigt eine Bestätigungsnachricht nach dem Absenden

## 🔐 Datenschutz

- DSGVO-konforme Datenschutzerklärung
- Cookie-Consent-Banner
- Cookie-Policy Seite
- Sichere Datenübertragung (SSL erforderlich)

## 📖 Weitere Dokumentation

Siehe `DEPLOYMENT.md` für detaillierte Deployment-Anleitung.

## 📄 Lizenz

[Ihre Lizenz hier]

