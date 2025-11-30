# Deployment-Anleitung

## Vorbereitung

1. **Umgebungsvariablen einrichten**
   - Erstellen Sie eine `.env.local` Datei für lokale Entwicklung
   - Erstellen Sie Umgebungsvariablen in Ihrem Hosting-Provider

2. **Impressum und Datenschutz aktualisieren**
   - Aktualisieren Sie `/app/impressum/page.tsx` mit Ihren echten Firmendaten
   - Aktualisieren Sie `/app/datenschutz/page.tsx` mit Ihren Kontaktdaten

3. **Kontaktformular Backend**
   - Das Kontaktformular sendet aktuell nur an die Konsole
   - Integrieren Sie ein Backend (z.B. API Route in Next.js oder externer Service)
   - Oder verwenden Sie einen Service wie Formspree, SendGrid, etc.

## Build und Deployment

### Vercel (Empfohlen)

1. Installieren Sie die Vercel CLI: `npm i -g vercel`
2. Führen Sie `vercel` im Projektverzeichnis aus
3. Folgen Sie den Anweisungen

### Andere Hosting-Provider

```bash
# Build erstellen
npm run build

# Production Server starten
npm start
```

## SSL-Zertifikat

- Vercel und die meisten modernen Hosting-Provider bieten automatisch SSL-Zertifikate
- Stellen Sie sicher, dass HTTPS aktiviert ist

## SEO-Checkliste

- [ ] Meta-Tags sind korrekt gesetzt
- [ ] Sitemap ist erreichbar unter `/sitemap.xml`
- [ ] Robots.txt ist erreichbar unter `/robots.txt`
- [ ] Alle Seiten haben einzigartige Titles und Descriptions
- [ ] Structured Data (Schema.org) hinzufügen (optional, aber empfohlen)

## Performance-Optimierung

- [ ] Bilder optimieren (Next.js Image Component verwenden)
- [ ] Lazy Loading für nicht-kritische Inhalte
- [ ] CDN für statische Assets

## Analytics

- [ ] Google Analytics einrichten (optional)
- [ ] Conversion Tracking für Kontaktformular

