# Deployment-Anleitung - but-lernfoerderung.de

Diese Anleitung erklärt, wie Sie die Website online setzen können.

## 🚀 Option 1: Vercel (Empfohlen - Einfachste Option)

Vercel ist die einfachste Option für Next.js-Anwendungen und bietet:
- ✅ Automatisches Deployment von GitHub
- ✅ Kostenloses Hosting
- ✅ Automatische SSL-Zertifikate
- ✅ CDN für schnelle Ladezeiten
- ✅ Einfache Umgebungsvariablen-Verwaltung

### Schritt-für-Schritt:

1. **Vercel-Account erstellen**
   - Gehen Sie zu https://vercel.com
   - Melden Sie sich mit Ihrem GitHub-Account an

2. **Neues Projekt erstellen**
   - Klicken Sie auf "Add New Project"
   - Wählen Sie das Repository "But-Lernfoerderung" aus
   - Vercel erkennt automatisch Next.js

3. **Projekt-Konfiguration**
   - **Framework Preset:** Next.js (automatisch erkannt)
   - **Root Directory:** `./` (Standard)
   - **Build Command:** `npm run build` (Standard)
   - **Output Directory:** `.next` (Standard)
   - **Install Command:** `npm install` (Standard)

4. **Umgebungsvariablen (falls benötigt)**
   - Falls Sie Umgebungsvariablen haben (z.B. für Admin-Passwörter):
     - Gehen Sie zu "Environment Variables"
     - Fügen Sie Variablen hinzu (z.B. `NEXT_PUBLIC_ADMIN_PASSWORD`)

5. **Deploy**
   - Klicken Sie auf "Deploy"
   - Warten Sie ca. 2-3 Minuten
   - Ihre Website ist live! 🎉

6. **Domain verbinden (Optional)**
   - Gehen Sie zu "Settings" → "Domains"
   - Fügen Sie Ihre Domain hinzu (z.B. `but-lernfoerderung.de`)
   - Folgen Sie den DNS-Anweisungen

### ⚠️ Wichtige Hinweise für Vercel:

**Problem: Dateispeicher für Kontakte**
- Vercel verwendet ein serverless File-System, das bei jedem Deployment zurückgesetzt wird
- Die `/data/contacts.json` Datei wird nicht dauerhaft gespeichert

**Lösungen:**
1. **Externe Datenbank verwenden** (Empfohlen):
   - MongoDB Atlas (kostenlos bis 512MB)
   - Supabase (kostenlos)
   - PlanetScale (kostenlos)
   - PostgreSQL auf Railway/Render

2. **Vercel KV (Redis)** für einfache Speicherung

3. **Vercel Blob Storage** für Dateien

---

## 🌐 Option 2: Netlify

### Vorgehen:
1. Gehen Sie zu https://netlify.com
2. Melden Sie sich mit GitHub an
3. "Add new site" → "Import an existing project"
4. Wählen Sie Ihr Repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Klicken Sie auf "Deploy"

**Hinweis:** Netlify hat ähnliche Einschränkungen wie Vercel bezüglich Dateispeicher.

---

## 🖥️ Option 3: Eigenes VPS/Server (Vollständige Kontrolle)

### Voraussetzungen:
- VPS/Server mit Node.js 18+ installiert
- Domain mit DNS-Einstellungen
- SSL-Zertifikat (Let's Encrypt)

### Schritt-für-Schritt:

1. **Server vorbereiten**
   ```bash
   # Node.js installieren (falls nicht vorhanden)
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Nginx installieren
   sudo apt-get install nginx
   ```

2. **Projekt auf Server klonen**
   ```bash
   cd /var/www
   git clone https://github.com/Bold88/But-Lernfoerderung.git
   cd But-Lernfoerderung
   npm install
   ```

3. **Build erstellen**
   ```bash
   npm run build
   ```

4. **PM2 für Prozess-Management installieren**
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "but-lernfoerderung" -- start
   pm2 save
   pm2 startup
   ```

5. **Nginx konfigurieren**
   ```bash
   sudo nano /etc/nginx/sites-available/but-lernfoerderung
   ```
   
   Konfiguration:
   ```nginx
   server {
       listen 80;
       server_name but-lernfoerderung.de www.but-lernfoerderung.de;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Aktivieren:
   ```bash
   sudo ln -s /etc/nginx/sites-available/but-lernfoerderung /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **SSL-Zertifikat (Let's Encrypt)**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d but-lernfoerderung.de -d www.but-lernfoerderung.de
   ```

7. **Datenverzeichnis erstellen**
   ```bash
   mkdir -p /var/www/But-Lernfoerderung/data
   chmod 755 /var/www/But-Lernfoerderung/data
   ```

---

## 📋 Checkliste vor dem Deployment

### ✅ Code-Qualität
- [ ] Alle Änderungen auf GitHub gepusht
- [ ] Keine Fehler im Build (`npm run build`)
- [ ] Linter-Fehler behoben (`npm run lint`)

### ✅ Umgebungsvariablen
- [ ] Admin-Passwörter sicher gespeichert
- [ ] Keine sensiblen Daten im Code

### ✅ Datenpersistenz
- [ ] Lösung für Kontaktspeicherung implementiert
- [ ] Datenbank oder externer Speicher eingerichtet

### ✅ Domain & DNS
- [ ] Domain registriert
- [ ] DNS-Einstellungen vorbereitet

### ✅ Testing
- [ ] Lokale Tests erfolgreich
- [ ] Formulare funktionieren
- [ ] Admin-Dashboard getestet

---

## 🔧 Wichtige Anpassungen für Production

### 1. Datenbank für Kontakte einrichten

**Empfohlen: MongoDB Atlas (kostenlos)**

1. Gehen Sie zu https://www.mongodb.com/cloud/atlas
2. Erstellen Sie einen kostenlosen Account
3. Erstellen Sie einen Cluster
4. Erstellen Sie eine Datenbank und Collection
5. Holen Sie sich die Connection String

**Code-Anpassung:**
```typescript
// app/api/contact/route.ts
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)
// ... Kontakte in MongoDB speichern
```

### 2. Umgebungsvariablen setzen

In Vercel/Netlify:
- `MONGODB_URI` - MongoDB Connection String
- `NEXT_PUBLIC_ADMIN_PASSWORD` - Admin-Passwort (optional, wenn Sie Token-Auth verwenden)

### 3. Admin-Dashboard sichern

Stellen Sie sicher, dass:
- Admin-Routen geschützt sind
- Passwörter sicher gehasht sind
- Rate-Limiting implementiert ist

---

## 🚨 Häufige Probleme & Lösungen

### Problem: "Module not found" Fehler
**Lösung:** `npm install` auf dem Server ausführen

### Problem: Kontakte werden nicht gespeichert
**Lösung:** Externe Datenbank verwenden (siehe oben)

### Problem: Build schlägt fehl
**Lösung:** 
- Prüfen Sie die Build-Logs
- Stellen Sie sicher, dass alle Dependencies installiert sind
- Prüfen Sie TypeScript-Fehler

### Problem: Bilder werden nicht angezeigt
**Lösung:** 
- Stellen Sie sicher, dass Bilder im `/public` Ordner sind
- Prüfen Sie die Bildpfade

---

## 📞 Support

Bei Fragen zum Deployment können Sie:
- Vercel-Dokumentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

---

## 🎯 Schnellstart (Vercel - 5 Minuten)

1. Gehen Sie zu https://vercel.com
2. "Add New Project" → Repository auswählen
3. "Deploy" klicken
4. Fertig! 🎉

**Wichtig:** Vergessen Sie nicht, eine Datenbank für die Kontakte einzurichten!
