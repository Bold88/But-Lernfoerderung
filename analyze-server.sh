#!/bin/bash

echo "=========================================="
echo "VPS-Server Analyse für Next.js Installation"
echo "=========================================="
echo ""

echo "1. WEBROOT VERZEICHNISSE:"
echo "------------------------"
ls -la /var/www/ 2>/dev/null || echo "   /var/www existiert nicht"
echo ""

echo "2. NGINX KONFIGURATION:"
echo "----------------------"
if [ -d "/etc/nginx/sites-enabled" ]; then
    echo "   Sites enabled:"
    ls -la /etc/nginx/sites-enabled/
    echo ""
    echo "   Sites available:"
    ls -la /etc/nginx/sites-available/ 2>/dev/null || echo "   Nicht gefunden"
else
    echo "   Nginx sites-enabled Verzeichnis nicht gefunden"
fi
echo ""

echo "3. NGINX HAUPTKONFIGURATION:"
echo "---------------------------"
if [ -f "/etc/nginx/nginx.conf" ]; then
    echo "   Nginx Hauptkonfiguration gefunden"
    grep -E "server_name|root|listen" /etc/nginx/sites-enabled/* 2>/dev/null | head -20
else
    echo "   Nginx Hauptkonfiguration nicht gefunden"
fi
echo ""

echo "4. WORDPRESS INSTALLATION:"
echo "-------------------------"
if [ -d "/var/www/html" ]; then
    echo "   /var/www/html gefunden:"
    ls -la /var/www/html/ | head -10
    if [ -f "/var/www/html/wp-config.php" ]; then
        echo "   ✓ WordPress wp-config.php gefunden"
        grep "DB_NAME\|DB_USER" /var/www/html/wp-config.php 2>/dev/null | head -2
    fi
elif [ -d "/var/www/wordpress" ]; then
    echo "   /var/www/wordpress gefunden:"
    ls -la /var/www/wordpress/ | head -10
    if [ -f "/var/www/wordpress/wp-config.php" ]; then
        echo "   ✓ WordPress wp-config.php gefunden"
    fi
else
    echo "   WordPress-Verzeichnis nicht in /var/www gefunden"
fi
echo ""

echo "5. NODE.JS & NPM:"
echo "----------------"
if command -v node &> /dev/null; then
    echo "   ✓ Node.js installiert: $(node --version)"
    echo "   ✓ NPM installiert: $(npm --version)"
else
    echo "   ✗ Node.js nicht installiert"
fi
echo ""

echo "6. SYSTEM INFORMATIONEN:"
echo "-----------------------"
echo "   OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d '"' -f 2)"
echo "   Kernel: $(uname -r)"
echo "   RAM: $(free -h | grep Mem | awk '{print $2}')"
echo "   Disk: $(df -h / | tail -1 | awk '{print $4 " frei von " $2}')"
echo ""

echo "7. LAUFENDE SERVICES:"
echo "--------------------"
systemctl list-units --type=service --state=running | grep -E "nginx|apache|php|mysql|mariadb" | head -10 || echo "   Keine relevanten Services gefunden"
echo ""

echo "8. VERFÜGBARE PORTS:"
echo "-------------------"
netstat -tuln | grep -E ":80|:443|:3000|:4000" || echo "   Keine relevanten Ports gefunden"
echo ""

echo "9. VERFÜGBARE DOMÄNEN:"
echo "---------------------"
if [ -d "/etc/nginx/sites-enabled" ]; then
    for file in /etc/nginx/sites-enabled/*; do
        if [ -f "$file" ]; then
            echo "   Datei: $(basename $file)"
            grep -E "server_name|root" "$file" | head -3
            echo ""
        fi
    done
fi
echo ""

echo "=========================================="
echo "Analyse abgeschlossen"
echo "=========================================="

