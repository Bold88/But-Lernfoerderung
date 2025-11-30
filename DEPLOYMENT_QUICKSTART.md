# 🚀 Schnellstart: Website online setzen

## Option 1: Vercel (5 Minuten - Empfohlen)

### Schritt 1: Vercel-Account
1. Gehen Sie zu **https://vercel.com**
2. Klicken Sie auf **"Sign Up"**
3. Wählen Sie **"Continue with GitHub"**
4. Autorisiere Vercel, auf Ihr GitHub zu zugreifen

### Schritt 2: Projekt deployen
1. Klicken Sie auf **"Add New Project"**
2. Wählen Sie das Repository **"But-Lernfoerderung"**
3. Vercel erkennt automatisch Next.js
4. Klicken Sie auf **"Deploy"**
5. Warten Sie 2-3 Minuten
6. ✅ **Fertig!** Ihre Website ist live

### Schritt 3: Domain verbinden (Optional)
1. Gehen Sie zu **Settings** → **Domains**
2. Fügen Sie Ihre Domain hinzu: `but-lernfoerderung.de`
3. Folgen Sie den DNS-Anweisungen

---

## ⚠️ WICHTIG: Datenbank einrichten

**Problem:** Aktuell werden Kontakte in `/data/contacts.json` gespeichert. Das funktioniert auf Vercel/Netlify nicht, da diese serverless sind.

### Lösung: MongoDB Atlas (kostenlos)

1. **Account erstellen:**
   - Gehen Sie zu https://www.mongodb.com/cloud/atlas
   - Erstellen Sie einen kostenlosen Account

2. **Cluster erstellen:**
   - Klicken Sie auf "Create Cluster"
   - Wählen Sie "Free" (M0)
   - Wählen Sie eine Region (z.B. Frankfurt)
   - Klicken Sie auf "Create"

3. **Datenbankzugriff einrichten:**
   - Gehen Sie zu "Database Access"
   - Klicken Sie auf "Add New Database User"
   - Benutzername und Passwort erstellen
   - Klicken Sie auf "Add User"

4. **Network Access:**
   - Gehen Sie zu "Network Access"
   - Klicken Sie auf "Add IP Address"
   - Wählen Sie "Allow Access from Anywhere" (0.0.0.0/0)
   - Klicken Sie auf "Confirm"

5. **Connection String holen:**
   - Gehen Sie zu "Database" → "Connect"
   - Wählen Sie "Connect your application"
   - Kopieren Sie den Connection String
   - Ersetzen Sie `<password>` mit Ihrem Passwort
   - Ersetzen Sie `<dbname>` mit z.B. `but-lernfoerderung`

6. **In Vercel einrichten:**
   - Gehen Sie zu Ihrem Projekt → "Settings" → "Environment Variables"
   - Fügen Sie hinzu:
     - **Name:** `MONGODB_URI`
     - **Value:** Ihr Connection String
   - Klicken Sie auf "Save"
   - **WICHTIG:** Redeployen Sie die Anwendung

### Code-Anpassung für MongoDB

Sie müssen die API-Routen anpassen, um MongoDB statt Dateien zu verwenden. Ich kann Ihnen dabei helfen, wenn Sie möchten.

---

## Option 2: Eigenes VPS (Vollständige Kontrolle)

Wenn Sie einen eigenen Server haben:

1. **Server vorbereiten:**
   ```bash
   # Node.js installieren
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Nginx installieren
   sudo apt-get install nginx
   ```

2. **Projekt klonen:**
   ```bash
   cd /var/www
   git clone https://github.com/Bold88/But-Lernfoerderung.git
   cd But-Lernfoerderung
   npm install
   npm run build
   ```

3. **PM2 installieren:**
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "but-lernfoerderung" -- start
   pm2 save
   pm2 startup
   ```

4. **Nginx konfigurieren:**
   - Erstellen Sie `/etc/nginx/sites-available/but-lernfoerderung`
   - Siehe DEPLOYMENT.md für vollständige Konfiguration

5. **SSL-Zertifikat:**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d but-lernfoerderung.de
   ```

---

## 📋 Checkliste

- [ ] Code auf GitHub gepusht
- [ ] Vercel-Account erstellt
- [ ] Projekt deployed
- [ ] MongoDB Atlas eingerichtet (oder andere Datenbank)
- [ ] Umgebungsvariablen gesetzt
- [ ] Domain verbunden (optional)
- [ ] Website getestet

---

## 🆘 Hilfe benötigt?

Wenn Sie Hilfe bei der Einrichtung der Datenbank oder anderen Anpassungen benötigen, lassen Sie es mich wissen!

