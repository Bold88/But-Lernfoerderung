#!/bin/bash

# Sicheres Installations-Skript für Next.js neben WordPress
# WordPress wird NICHT verändert

set -e

# Farben
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "Next.js Installation - SICHER neben WordPress"
echo "==========================================${NC}"
echo ""

# Prüfe ob als root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Bitte als root ausführen: sudo $0${NC}"
    exit 1
fi

# Schritt 1: Aktuelle Apache-Konfiguration sichern
echo -e "${YELLOW}[1/10] Sichere WordPress Apache-Konfiguration...${NC}"
if [ -d "/etc/apache2/sites-enabled" ]; then
    BACKUP_DIR="/root/apache-backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    cp -r /etc/apache2/sites-enabled/* "$BACKUP_DIR/" 2>/dev/null || true
    cp -r /etc/apache2/sites-available/* "$BACKUP_DIR/" 2>/dev/null || true
    echo -e "${GREEN}✓ Backup erstellt in: $BACKUP_DIR${NC}"
else
    echo -e "${YELLOW}⚠ Apache sites-enabled nicht gefunden${NC}"
fi

# Schritt 2: Prüfe WordPress-Konfiguration
echo ""
echo -e "${YELLOW}[2/10] Prüfe WordPress-Installation...${NC}"
if [ -f "/var/www/html/minilernkreis.de/wp-config.php" ]; then
    WORDPRESS_DOMAIN=$(grep -E "WP_HOME|WP_SITEURL" /var/www/html/minilernkreis.de/wp-config.php 2>/dev/null | head -1 || echo "")
    echo -e "${GREEN}✓ WordPress gefunden in /var/www/html/minilernkreis.de${NC}"
    echo -e "${BLUE}  WordPress Domain: minilernkreis.de${NC}"
else
    echo -e "${YELLOW}⚠ WordPress wp-config.php nicht gefunden${NC}"
fi

# Schritt 3: Prüfe bestehende Apache-Sites
echo ""
echo -e "${YELLOW}[3/10] Prüfe bestehende Apache-Sites...${NC}"
if [ -d "/etc/apache2/sites-enabled" ]; then
    echo "Aktive Sites:"
    ls -la /etc/apache2/sites-enabled/ | grep -v "^total" | grep -v "^d"
    echo ""
    echo "WordPress-Konfigurationen werden NICHT verändert!"
fi

# Schritt 4: Node.js installieren
echo ""
echo -e "${YELLOW}[4/10] Installiere Node.js...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
    echo -e "${GREEN}✓ Node.js installiert: $(node --version)${NC}"
else
    echo -e "${GREEN}✓ Node.js bereits installiert: $(node --version)${NC}"
fi

# Schritt 5: PM2 installieren
echo ""
echo -e "${YELLOW}[5/10] Installiere PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 installiert${NC}"
else
    echo -e "${GREEN}✓ PM2 bereits installiert${NC}"
fi

# Schritt 6: Projektverzeichnis erstellen (SEPARAT von WordPress)
echo ""
echo -e "${YELLOW}[6/10] Erstelle Projektverzeichnis...${NC}"
mkdir -p /var/www/but-lernfoerderung
cd /var/www/but-lernfoerderung

if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Projekt bereits vorhanden, aktualisiere...${NC}"
    git pull
else
    echo -e "${YELLOW}   Klone Projekt von GitHub...${NC}"
    git clone https://github.com/Bold88/But-Lernfoerderung.git .
fi

# Schritt 7: Dependencies installieren
echo ""
echo -e "${YELLOW}[7/10] Installiere Dependencies...${NC}"
npm install

# Schritt 8: Build erstellen
echo ""
echo -e "${YELLOW}[8/10] Erstelle Build...${NC}"
npm run build

# Schritt 9: Datenverzeichnis erstellen
echo ""
echo -e "${YELLOW}[9/10] Erstelle Datenverzeichnis...${NC}"
mkdir -p data
chmod 755 data
chown -R www-data:www-data data 2>/dev/null || chown -R $USER:$USER data

# Schritt 10: PM2 starten
echo ""
echo -e "${YELLOW}[10/10] Starte PM2...${NC}"
if pm2 list | grep -q "but-lernfoerderung"; then
    echo -e "${GREEN}✓ PM2 Prozess bereits vorhanden, starte neu...${NC}"
    pm2 restart but-lernfoerderung
else
    cd /var/www/but-lernfoerderung
    pm2 start npm --name "but-lernfoerderung" -- start
    pm2 save
    pm2 startup systemd -u root --hp /root
    echo -e "${GREEN}✓ PM2 gestartet${NC}"
fi

# Schritt 11: Apache-Module aktivieren (sicher)
echo ""
echo -e "${YELLOW}[11/12] Aktiviere Apache-Module...${NC}"
a2enmod proxy 2>/dev/null || echo "Module proxy bereits aktiv"
a2enmod proxy_http 2>/dev/null || echo "Module proxy_http bereits aktiv"
a2enmod rewrite 2>/dev/null || echo "Module rewrite bereits aktiv"
a2enmod headers 2>/dev/null || echo "Module headers bereits aktiv"
echo -e "${GREEN}✓ Apache-Module aktiviert${NC}"

# Schritt 12: Apache Virtual Host für Next.js erstellen (NEU, WordPress bleibt unverändert)
echo ""
echo -e "${YELLOW}[12/12] Erstelle Apache Virtual Host für Next.js...${NC}"

# Prüfe ob bereits vorhanden
if [ -f "/etc/apache2/sites-available/but-lernfoerderung.conf" ]; then
    echo -e "${YELLOW}⚠ Konfiguration bereits vorhanden, überschreibe...${NC}"
fi

cat > /etc/apache2/sites-available/but-lernfoerderung.conf << 'EOF'
# Next.js Virtual Host - SEPARAT von WordPress
# WordPress bleibt unverändert!

<VirtualHost *:80>
    ServerName but-lernfoerderung.de
    ServerAlias www.but-lernfoerderung.de

    # Reverse Proxy zu Next.js (Port 3000)
    ProxyPreserveHost On
    ProxyRequests Off
    
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # WebSocket Support
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
    
    # Headers
    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-Port "80"
    
    # Logging
    ErrorLog ${APACHE_LOG_DIR}/but-lernfoerderung_error.log
    CustomLog ${APACHE_LOG_DIR}/but-lernfoerderung_access.log combined
    
    # Timeouts für größere Requests
    ProxyTimeout 300
</VirtualHost>
EOF

echo -e "${GREEN}✓ Virtual Host erstellt${NC}"

# Schritt 13: Site aktivieren
echo ""
echo -e "${YELLOW}[13/13] Aktiviere Apache Site...${NC}"
a2ensite but-lernfoerderung.conf
echo -e "${GREEN}✓ Site aktiviert${NC}"

# Schritt 14: Apache-Konfiguration testen
echo ""
echo -e "${YELLOW}[14/14] Teste Apache-Konfiguration...${NC}"
if apache2ctl configtest; then
    echo -e "${GREEN}✓ Konfiguration OK - WordPress bleibt unverändert!${NC}"
    echo ""
    echo -e "${YELLOW}Lade Apache neu...${NC}"
    systemctl reload apache2
    echo -e "${GREEN}✓ Apache neu geladen${NC}"
else
    echo -e "${RED}❌ Apache-Konfiguration hat Fehler!${NC}"
    echo -e "${YELLOW}WordPress bleibt unverändert. Bitte Fehler beheben.${NC}"
    exit 1
fi

# Finale Prüfung
echo ""
echo -e "${BLUE}=========================================="
echo "✅ Installation abgeschlossen!"
echo "==========================================${NC}"
echo ""
echo -e "${GREEN}✓ Next.js läuft auf: http://localhost:3000${NC}"
echo -e "${GREEN}✓ Apache leitet weiter zu: but-lernfoerderung.de${NC}"
echo -e "${GREEN}✓ WordPress bleibt unverändert auf: minilernkreis.de${NC}"
echo ""
echo -e "${YELLOW}Status prüfen:${NC}"
echo "  pm2 status"
echo "  pm2 logs but-lernfoerderung"
echo ""
echo -e "${YELLOW}Nächste Schritte:${NC}"
echo "  1. DNS für but-lernfoerderung.de auf 87.106.75.122 zeigen lassen"
echo "  2. SSL installieren: sudo certbot --apache -d but-lernfoerderung.de"
echo "  3. Website testen"
echo ""
echo -e "${BLUE}WordPress wurde NICHT verändert! ✓${NC}"

