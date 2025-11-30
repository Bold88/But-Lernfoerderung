#!/bin/bash

# Next.js Installation auf VPS neben WordPress
# Für Ubuntu 24.04 mit Apache

set -e

echo "=========================================="
echo "Next.js Installation auf VPS"
echo "=========================================="
echo ""

# Farben für Output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Prüfe ob als root ausgeführt
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Bitte als root ausführen: sudo $0${NC}"
    exit 1
fi

echo -e "${YELLOW}1. Node.js installieren...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
    echo -e "${GREEN}✓ Node.js installiert: $(node --version)${NC}"
else
    echo -e "${GREEN}✓ Node.js bereits installiert: $(node --version)${NC}"
fi

echo ""
echo -e "${YELLOW}2. PM2 installieren...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 installiert${NC}"
else
    echo -e "${GREEN}✓ PM2 bereits installiert${NC}"
fi

echo ""
echo -e "${YELLOW}3. Projektverzeichnis erstellen...${NC}"
mkdir -p /var/www/but-lernfoerderung
cd /var/www/but-lernfoerderung

if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Projekt bereits vorhanden, aktualisiere...${NC}"
    git pull
else
    echo -e "${YELLOW}   Klone Projekt von GitHub...${NC}"
    git clone https://github.com/Bold88/But-Lernfoerderung.git .
fi

echo ""
echo -e "${YELLOW}4. Dependencies installieren...${NC}"
npm install

echo ""
echo -e "${YELLOW}5. Build erstellen...${NC}"
npm run build

echo ""
echo -e "${YELLOW}6. Datenverzeichnis erstellen...${NC}"
mkdir -p data
chmod 755 data

echo ""
echo -e "${YELLOW}7. PM2 starten...${NC}"
if pm2 list | grep -q "but-lernfoerderung"; then
    echo -e "${GREEN}✓ PM2 Prozess bereits vorhanden, starte neu...${NC}"
    pm2 restart but-lernfoerderung
else
    pm2 start npm --name "but-lernfoerderung" -- start
    pm2 save
    pm2 startup
    echo -e "${GREEN}✓ PM2 gestartet${NC}"
fi

echo ""
echo -e "${YELLOW}8. Apache-Module aktivieren...${NC}"
a2enmod proxy
a2enmod proxy_http
a2enmod rewrite
a2enmod headers
echo -e "${GREEN}✓ Apache-Module aktiviert${NC}"

echo ""
echo -e "${YELLOW}9. Apache Virtual Host erstellen...${NC}"
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
    
    ErrorLog ${APACHE_LOG_DIR}/but-lernfoerderung_error.log
    CustomLog ${APACHE_LOG_DIR}/but-lernfoerderung_access.log combined
</VirtualHost>
EOF

echo -e "${GREEN}✓ Virtual Host erstellt${NC}"

echo ""
echo -e "${YELLOW}10. Apache Site aktivieren...${NC}"
a2ensite but-lernfoerderung.conf

echo ""
echo -e "${YELLOW}11. Apache-Konfiguration testen...${NC}"
if apache2ctl configtest; then
    echo -e "${GREEN}✓ Konfiguration OK${NC}"
    systemctl reload apache2
    echo -e "${GREEN}✓ Apache neu geladen${NC}"
else
    echo -e "${RED}❌ Apache-Konfiguration hat Fehler!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}=========================================="
echo "✅ Installation abgeschlossen!"
echo "==========================================${NC}"
echo ""
echo "Next.js läuft auf: http://localhost:3000"
echo "Apache leitet weiter zu: but-lernfoerderung.de"
echo ""
echo "Nächste Schritte:"
echo "1. DNS für but-lernfoerderung.de auf 87.106.75.122 zeigen lassen"
echo "2. SSL-Zertifikat installieren: sudo certbot --apache -d but-lernfoerderung.de"
echo "3. Website testen"
echo ""

