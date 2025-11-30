# VPS Installation - Next.js neben WordPress

## 📋 Server-Analyse durchführen

### Schritt 1: Analyse-Skript auf Server ausführen

1. **Verbinden Sie sich mit dem Server:**
   ```bash
   ssh root@87.106.75.122
   ```
   (Passwort: 2hq9Oi33)

2. **Laden Sie das Analyse-Skript hoch oder erstellen Sie es:**
   ```bash
   # Option 1: Skript direkt erstellen
   nano /tmp/analyze-server.sh
   # Kopieren Sie den Inhalt von analyze-server.sh hinein
   # Speichern mit Ctrl+X, dann Y, dann Enter
   
   chmod +x /tmp/analyze-server.sh
   /tmp/analyze-server.sh > /tmp/server-analysis.txt
   cat /tmp/server-analysis.txt
   ```

3. **Oder führen Sie diese Befehle manuell aus:**
   ```bash
   # Webroot prüfen
   ls -la /var/www/
   
   # Nginx Konfiguration prüfen
   ls -la /etc/nginx/sites-enabled/
   cat /etc/nginx/sites-enabled/*
   
   # WordPress prüfen
   find /var/www -name "wp-config.php" 2>/dev/null
   
   # Node.js prüfen
   node --version
   npm --version
   ```

---

## 🔍 Mögliche Szenarien

### Szenario 1: WordPress läuft auf Port 80, Next.js auf Port 3000

**Vorgehen:**
- Next.js auf Port 3000 laufen lassen
- Nginx als Reverse Proxy konfigurieren
- Subdomain oder Pfad für Next.js verwenden

### Szenario 2: WordPress auf Hauptdomain, Next.js auf Subdomain

**Vorgehen:**
- WordPress: `but-lernfoerderung.de` oder `www.but-lernfoerderung.de`
- Next.js: `app.but-lernfoerderung.de` oder `portal.but-lernfoerderung.de`

### Szenario 3: Beide auf derselben Domain mit unterschiedlichen Pfaden

**Vorgehen:**
- WordPress: `/` (Root)
- Next.js: `/app` oder `/portal`

---

## 📝 Installation (nach Analyse)

### Voraussetzungen prüfen:

```bash
# Node.js installieren (falls nicht vorhanden)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 für Prozess-Management
sudo npm install -g pm2
```

### Next.js installieren:

```bash
# Projektverzeichnis erstellen
mkdir -p /var/www/but-lernfoerderung
cd /var/www/but-lernfoerderung

# Projekt von GitHub klonen
git clone https://github.com/Bold88/But-Lernfoerderung.git .
npm install
npm run build

# Datenverzeichnis erstellen
mkdir -p data
chmod 755 data
```

### PM2 starten:

```bash
cd /var/www/but-lernfoerderung
pm2 start npm --name "but-lernfoerderung" -- start
pm2 save
pm2 startup
```

### Nginx konfigurieren:

**Option A: Subdomain (Empfohlen)**
```nginx
# /etc/nginx/sites-available/but-lernfoerderung
server {
    listen 80;
    server_name but-lernfoerderung.de www.but-lernfoerderung.de;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Option B: Neben WordPress (wenn WordPress auf anderer Domain)**
- WordPress bleibt unverändert
- Neue Nginx-Konfiguration für Next.js erstellen

**Aktivieren:**
```bash
sudo ln -s /etc/nginx/sites-available/but-lernfoerderung /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL-Zertifikat:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d but-lernfoerderung.de -d www.but-lernfoerderung.de
```

---

## ⚠️ Wichtige Punkte

1. **Port-Konflikte vermeiden:**
   - WordPress läuft normalerweise auf Port 80 (Nginx)
   - Next.js sollte auf Port 3000 laufen
   - Nginx leitet dann weiter

2. **Datenverzeichnis:**
   - `/var/www/but-lernfoerderung/data` muss beschreibbar sein
   - Berechtigungen: `chmod 755 data`

3. **Automatischer Start:**
   - PM2 sorgt dafür, dass Next.js nach Neustart läuft

4. **Updates:**
   ```bash
   cd /var/www/but-lernfoerderung
   git pull
   npm install
   npm run build
   pm2 restart but-lernfoerderung
   ```

---

## 🔐 Sicherheit

- Firewall konfigurieren (nur Port 80, 443, 22 offen)
- Regelmäßige Backups
- SSL-Zertifikat verwenden
- Admin-Passwörter sicher aufbewahren

---

## 📞 Nächste Schritte

1. **Führen Sie die Analyse durch** (siehe oben)
2. **Senden Sie mir die Ergebnisse**
3. **Ich erstelle eine maßgeschneiderte Installationsanleitung**

