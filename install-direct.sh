#!/bin/bash

# Direkte Installation OHNE GitHub
# WordPress bleibt unverändert!

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "Next.js Installation - SICHER neben WordPress"
echo "OHNE GitHub - Direkte Installation"
echo "==========================================${NC}"
echo ""

# Prüfe ob als root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Bitte als root ausführen: sudo $0${NC}"
    exit 1
fi

# Backup erstellen
echo -e "${YELLOW}[1/11] Sichere Apache-Konfiguration...${NC}"
BACKUP_DIR="/root/apache-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r /etc/apache2/sites-enabled/* "$BACKUP_DIR/" 2>/dev/null || true
cp -r /etc/apache2/sites-available/* "$BACKUP_DIR/" 2>/dev/null || true
echo -e "${GREEN}✓ Backup: $BACKUP_DIR${NC}"

# Prüfe WordPress
echo ""
echo -e "${YELLOW}[2/11] Prüfe WordPress...${NC}"
if [ -f "/var/www/html/minilernkreis.de/wp-config.php" ]; then
    echo -e "${GREEN}✓ WordPress gefunden - wird NICHT verändert${NC}"
else
    echo -e "${YELLOW}⚠ WordPress nicht gefunden${NC}"
fi

# Node.js installieren
echo ""
echo -e "${YELLOW}[3/11] Installiere Node.js...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
    echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"
else
    echo -e "${GREEN}✓ Node.js bereits installiert: $(node --version)${NC}"
fi

# PM2 installieren
echo ""
echo -e "${YELLOW}[4/11] Installiere PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 installiert${NC}"
else
    echo -e "${GREEN}✓ PM2 bereits installiert${NC}"
fi

# Projektverzeichnis erstellen
echo ""
echo -e "${YELLOW}[5/11] Erstelle Projektverzeichnis...${NC}"
mkdir -p /var/www/but-lernfoerderung
cd /var/www/but-lernfoerderung

# Prüfe ob bereits installiert
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓ Projekt bereits vorhanden${NC}"
    echo -e "${YELLOW}   Aktualisiere Dependencies...${NC}"
else
    echo -e "${YELLOW}   Projektverzeichnis erstellt${NC}"
    echo -e "${RED}   ⚠ WICHTIG: Projektdateien müssen noch kopiert werden!${NC}"
    echo -e "${YELLOW}   Bitte alle Projektdateien nach /var/www/but-lernfoerderung kopieren${NC}"
    exit 1
fi

# Dependencies
echo ""
echo -e "${YELLOW}[6/11] Installiere Dependencies...${NC}"
npm install

# Build
echo ""
echo -e "${YELLOW}[7/11] Erstelle Build...${NC}"
npm run build

# Datenverzeichnis
echo ""
echo -e "${YELLOW}[8/11] Erstelle Datenverzeichnis...${NC}"
mkdir -p data
chmod 755 data

# PM2 starten
echo ""
echo -e "${YELLOW}[9/11] Starte PM2...${NC}"
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
echo -e "${YELLOW}[10/11] Aktiviere Apache-Module...${NC}"
a2enmod proxy 2>/dev/null || true
a2enmod proxy_http 2>/dev/null || true
a2enmod rewrite 2>/dev/null || true
a2enmod headers 2>/dev/null || true
echo -e "${GREEN}✓ Module aktiviert${NC}"

# Virtual Host erstellen
echo ""
echo -e "${YELLOW}[11/11] Erstelle Apache Virtual Host...${NC}"
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
echo -e "${YELLOW}[12/12] Aktiviere Site...${NC}"
a2ensite but-lernfoerderung.conf
echo -e "${GREEN}✓ Site aktiviert${NC}"

# Apache testen
echo ""
echo -e "${YELLOW}[13/13] Teste Apache...${NC}"
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
echo -e "${YELLOW}Status prüfen:${NC}"
echo "  pm2 status"
echo "  pm2 logs but-lernfoerderung"
echo ""

