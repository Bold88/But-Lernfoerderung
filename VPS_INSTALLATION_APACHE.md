# VPS Installation - Next.js neben WordPress (Apache)

## 📊 Server-Analyse Ergebnisse

✅ **WordPress:** `/var/www/html/minilernkreis.de/`  
✅ **Webserver:** Apache2 (läuft auf Port 80)  
✅ **MySQL:** Läuft  
❌ **Node.js:** Nicht installiert  
✅ **Speicher:** 231 GB verfügbar (1.7% belegt)  

## ✅ Installation möglich!

Next.js kann problemlos neben WordPress installiert werden. Wir verwenden:
- **Apache als Reverse Proxy** für Next.js
- **Subdomain** oder **separater Port** für Next.js
- **PM2** für Prozess-Management

---

## 🚀 Installations-Schritte

### Schritt 1: Node.js installieren

```bash
# Node.js 18.x installieren
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installation prüfen
node --version
npm --version
```

### Schritt 2: PM2 installieren (Prozess-Management)

```bash
sudo npm install -g pm2
```

### Schritt 3: Apache Virtual Hosts prüfen

```bash
# Apache Konfigurationen anzeigen
ls -la /etc/apache2/sites-enabled/
cat /etc/apache2/sites-enabled/*
```

### Schritt 4: Next.js Projekt installieren

```bash
# Projektverzeichnis erstellen (neben WordPress)
mkdir -p /var/www/but-lernfoerderung
cd /var/www/but-lernfoerderung

# Projekt von GitHub klonen
git clone https://github.com/Bold88/But-Lernfoerderung.git .

# Dependencies installieren
npm install

# Build erstellen
npm run build

# Datenverzeichnis erstellen
mkdir -p data
chmod 755 data
```

### Schritt 5: PM2 starten

```bash
cd /var/www/but-lernfoerderung
pm2 start npm --name "but-lernfoerderung" -- start
pm2 save
pm2 startup
```

### Schritt 6: Apache als Reverse Proxy konfigurieren

**Option A: Subdomain (Empfohlen)**
- WordPress: `minilernkreis.de` oder `www.minilernkreis.de`
- Next.js: `but-lernfoerderung.de` oder `app.minilernkreis.de`

**Option B: Port-basiert**
- WordPress: Port 80 (bestehend)
- Next.js: Port 3000 mit Apache Proxy

---

## 📝 Apache Virtual Host Konfiguration

### Für Subdomain (but-lernfoerderung.de):

```bash
# Neue Apache-Konfiguration erstellen
sudo nano /etc/apache2/sites-available/but-lernfoerderung.conf
```

**Inhalt:**
```apache
<VirtualHost *:80>
    ServerName but-lernfoerderung.de
    ServerAlias www.but-lernfoerderung.de

    # Reverse Proxy zu Next.js
    ProxyPreserveHost On
    ProxyRequests Off
    
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # WebSocket Support
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
    
    # Logging
    ErrorLog ${APACHE_LOG_DIR}/but-lernfoerderung_error.log
    CustomLog ${APACHE_LOG_DIR}/but-lernfoerderung_access.log combined
</VirtualHost>
```

**Aktivieren:**
```bash
# Module aktivieren
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod headers

# Site aktivieren
sudo a2ensite but-lernfoerderung.conf

# Apache neu laden
sudo systemctl reload apache2
```

### Für Port-basiert (wenn keine Subdomain):

```apache
<VirtualHost *:80>
    ServerName but-lernfoerderung.de
    
    # Nur für bestimmte Pfade zu Next.js
    ProxyPreserveHost On
    
    # Alle Requests zu Next.js
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # Oder nur für /app Pfad:
    # ProxyPass /app http://localhost:3000/
    # ProxyPassReverse /app http://localhost:3000/
    
    ErrorLog ${APACHE_LOG_DIR}/but-lernfoerderung_error.log
    CustomLog ${APACHE_LOG_DIR}/but-lernfoerderung_access.log combined
</VirtualHost>
```

---

## 🔒 SSL-Zertifikat (Let's Encrypt)

```bash
# Certbot installieren
sudo apt-get update
sudo apt-get install certbot python3-certbot-apache

# SSL-Zertifikat für but-lernfoerderung.de
sudo certbot --apache -d but-lernfoerderung.de -d www.but-lernfoerderung.de

# Automatische Erneuerung testen
sudo certbot renew --dry-run
```

---

## 🔄 Updates & Wartung

### Projekt aktualisieren:
```bash
cd /var/www/but-lernfoerderung
git pull
npm install
npm run build
pm2 restart but-lernfoerderung
```

### PM2 Befehle:
```bash
# Status prüfen
pm2 status

# Logs anzeigen
pm2 logs but-lernfoerderung

# Neustart
pm2 restart but-lernfoerderung

# Stoppen
pm2 stop but-lernfoerderung

# Starten
pm2 start but-lernfoerderung
```

---

## ⚠️ Wichtige Hinweise

1. **Port 3000:** Next.js läuft auf Port 3000 (intern)
2. **Apache Proxy:** Apache leitet Requests weiter
3. **WordPress unverändert:** WordPress läuft weiterhin normal
4. **Datenverzeichnis:** `/var/www/but-lernfoerderung/data` muss beschreibbar sein
5. **Firewall:** Port 3000 muss NICHT öffentlich sein (nur localhost)

---

## 🧪 Testen

Nach der Installation:

1. **Next.js prüfen:**
   ```bash
   curl http://localhost:3000
   ```

2. **Apache-Konfiguration testen:**
   ```bash
   sudo apache2ctl configtest
   ```

3. **Im Browser testen:**
   - `http://but-lernfoerderung.de` (oder Ihre Domain)

---

## 📋 Checkliste

- [ ] Node.js installiert
- [ ] PM2 installiert
- [ ] Projekt geklont und gebaut
- [ ] PM2 gestartet
- [ ] Apache-Konfiguration erstellt
- [ ] Apache-Module aktiviert
- [ ] Site aktiviert
- [ ] Apache neu geladen
- [ ] SSL-Zertifikat installiert (optional)
- [ ] Website getestet

---

## 🆘 Troubleshooting

### Problem: "Port 3000 already in use"
```bash
# Prüfen, was auf Port 3000 läuft
sudo lsof -i :3000
# Prozess beenden falls nötig
```

### Problem: Apache startet nicht
```bash
# Konfiguration testen
sudo apache2ctl configtest
# Fehler beheben
```

### Problem: Next.js läuft nicht
```bash
# PM2 Logs prüfen
pm2 logs but-lernfoerderung
# Manuell starten zum Testen
cd /var/www/but-lernfoerderung
npm start
```

---

## 📞 Nächste Schritte

Soll ich Ihnen ein vollständiges Installations-Skript erstellen, das alle Schritte automatisch ausführt?

