# 🚀 Installation auf VPS - Schritt für Schritt

## ⚠️ WICHTIG: WordPress bleibt unverändert!

Diese Installation berührt WordPress NICHT. Next.js läuft parallel auf einem separaten Port.

---

## 📋 Installations-Schritte

### Schritt 1: Auf Server verbinden

```bash
ssh root@87.106.75.122
# Passwort: 2hq9Oi33
```

### Schritt 2: Installations-Skript erstellen

Kopieren Sie dieses komplette Skript auf den Server:

```bash
cat > /tmp/install-nextjs.sh << 'INSTALLSCRIPT'
#!/bin/bash

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "Next.js Installation - SICHER neben WordPress"
echo "==========================================${NC}"
echo ""

# Backup erstellen
echo -e "${YELLOW}[1/12] Sichere Apache-Konfiguration...${NC}"
BACKUP_DIR="/root/apache-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r /etc/apache2/sites-enabled/* "$BACKUP_DIR/" 2>/dev/null || true
cp -r /etc/apache2/sites-available/* "$BACKUP_DIR/" 2>/dev/null || true
echo -e "${GREEN}✓ Backup: $BACKUP_DIR${NC}"

# Node.js installieren
echo ""
echo -e "${YELLOW}[2/12] Installiere Node.js...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
    echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"
else
    echo -e "${GREEN}✓ Node.js bereits installiert: $(node --version)${NC}"
fi

# PM2 installieren
echo ""
echo -e "${YELLOW}[3/12] Installiere PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 installiert${NC}"
else
    echo -e "${GREEN}✓ PM2 bereits installiert${NC}"
fi

# Projektverzeichnis
echo ""
echo -e "${YELLOW}[4/12] Erstelle Projektverzeichnis...${NC}"
mkdir -p /var/www/but-lernfoerderung
cd /var/www/but-lernfoerderung

if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Projekt vorhanden, aktualisiere...${NC}"
    git pull
else
    echo -e "${YELLOW}   Klone von GitHub...${NC}"
    git clone https://github.com/Bold88/But-Lernfoerderung.git .
fi

# Dependencies
echo ""
echo -e "${YELLOW}[5/12] Installiere Dependencies...${NC}"
npm install

# Build
echo ""
echo -e "${YELLOW}[6/12] Erstelle Build...${NC}"
npm run build

# Datenverzeichnis
echo ""
echo -e "${YELLOW}[7/12] Erstelle Datenverzeichnis...${NC}"
mkdir -p data
chmod 755 data

# PM2 starten
echo ""
echo -e "${YELLOW}[8/12] Starte PM2...${NC}"
cd /var/www/but-lernfoerderung
if pm2 list | grep -q "but-lernfoerderung"; then
    pm2 restart but-lernfoerderung
else
    pm2 start npm --name "but-lernfoerderung" -- start
    pm2 save
    pm2 startup systemd -u root --hp /root
fi
echo -e "${GREEN}✓ PM2 gestartet${NC}"

# Apache-Module
echo ""
echo -e "${YELLOW}[9/12] Aktiviere Apache-Module...${NC}"
a2enmod proxy 2>/dev/null || true
a2enmod proxy_http 2>/dev/null || true
a2enmod rewrite 2>/dev/null || true
a2enmod headers 2>/dev/null || true
echo -e "${GREEN}✓ Module aktiviert${NC}"

# Virtual Host erstellen
echo ""
echo -e "${YELLOW}[10/12] Erstelle Apache Virtual Host...${NC}"
cat > /etc/apache2/sites-available/but-lernfoerderung.conf << 'EOF'
<VirtualHost *:80>
    ServerName but-lernfoerderung.de
    ServerAlias www.but-lernfoerderung.de

    ProxyPreserveHost On
    ProxyRequests Off
    
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
    
    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-Port "80"
    
    ErrorLog ${APACHE_LOG_DIR}/but-lernfoerderung_error.log
    CustomLog ${APACHE_LOG_DIR}/but-lernfoerderung_access.log combined
    
    ProxyTimeout 300
</VirtualHost>
EOF
echo -e "${GREEN}✓ Virtual Host erstellt${NC}"

# Site aktivieren
echo ""
echo -e "${YELLOW}[11/12] Aktiviere Site...${NC}"
a2ensite but-lernfoerderung.conf
echo -e "${GREEN}✓ Site aktiviert${NC}"

# Apache testen
echo ""
echo -e "${YELLOW}[12/12] Teste Apache...${NC}"
if apache2ctl configtest; then
    systemctl reload apache2
    echo -e "${GREEN}✓ Apache neu geladen${NC}"
else
    echo -e "${RED}❌ Fehler in Apache-Konfiguration!${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}=========================================="
echo "✅ Installation abgeschlossen!"
echo "==========================================${NC}"
echo ""
echo -e "${GREEN}Next.js: http://localhost:3000${NC}"
echo -e "${GREEN}Apache: but-lernfoerderung.de → Next.js${NC}"
echo -e "${GREEN}WordPress: minilernkreis.de (unverändert)${NC}"
echo ""
INSTALLSCRIPT

chmod +x /tmp/install-nextjs.sh
```

### Schritt 3: Skript ausführen

```bash
/tmp/install-nextjs.sh
```

Das Skript führt automatisch alle Schritte aus und erstellt ein Backup.

---

## ✅ Nach der Installation prüfen

```bash
# PM2 Status
pm2 status

# Next.js prüfen
curl http://localhost:3000

# Apache-Konfiguration testen
apache2ctl configtest

# Apache-Sites anzeigen
ls -la /etc/apache2/sites-enabled/
```

---

## 🔒 SSL-Zertifikat installieren (Optional)

```bash
sudo apt-get install certbot python3-certbot-apache
sudo certbot --apache -d but-lernfoerderung.de -d www.but-lernfoerderung.de
```

---

## 📝 Wichtige Hinweise

1. **WordPress bleibt unverändert** - Alle WordPress-Dateien und -Konfigurationen bleiben bestehen
2. **Separate Konfiguration** - Next.js hat eine eigene Apache-Konfiguration
3. **Port 3000** - Next.js läuft intern auf Port 3000, nicht öffentlich
4. **Backup erstellt** - Apache-Konfiguration wird gesichert

---

## 🆘 Bei Problemen

```bash
# PM2 Logs
pm2 logs but-lernfoerderung

# Apache Logs
tail -f /var/log/apache2/but-lernfoerderung_error.log

# Apache zurücksetzen (falls nötig)
a2dissite but-lernfoerderung.conf
systemctl reload apache2
```

