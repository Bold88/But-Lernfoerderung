# 🔒 Vollständige Trennung: WordPress & Next.js

## ✅ Beide Projekte sind komplett getrennt

### 📍 WordPress Installation
- **Domain:** `dev.minilernkreis.de`
- **Verzeichnis:** `/var/www/html/minilernkreis.de`
- **Apache Config:** `/etc/apache2/sites-available/wordpress.conf`
- **Port:** 443 (SSL) + 80 (Redirect zu SSL)
- **DNS:** Eigener DNS-Record für `dev.minilernkreis.de`
- **Status:** ✅ Läuft unabhängig

### 📍 Next.js Installation
- **Domain:** `but-lernfoerderung.de`
- **Verzeichnis:** `/var/www/but-lernfoerderung`
- **Apache Config:** `/etc/apache2/sites-available/but-lernfoerderung.conf`
- **Port:** 3000 (intern) → 80 (Apache Reverse Proxy)
- **DNS:** Eigener DNS-Record für `but-lernfoerderung.de`
- **Status:** ✅ Läuft unabhängig

## 🔐 Sicherheits-Trennung

### Keine gemeinsamen Ressourcen:
- ✅ Separate Verzeichnisse
- ✅ Separate Apache VirtualHosts
- ✅ Separate Log-Dateien
- ✅ Separate DNS-Records
- ✅ Separate Prozesse (PM2 für Next.js, PHP-FPM für WordPress)

### Apache-Konfigurationen:

**WordPress:**
- Reagiert NUR auf `dev.minilernkreis.de`
- Verwendet direktes DocumentRoot
- Hat SSL-Zertifikat

**Next.js:**
- Reagiert NUR auf `but-lernfoerderung.de`
- Verwendet Reverse Proxy zu localhost:3000
- Keine Verbindung zu WordPress-Verzeichnissen

## 📊 Aktive Sites

```bash
# Prüfen:
ls -la /etc/apache2/sites-enabled/

# Sollte zeigen:
# - wordpress.conf → WordPress
# - but-lernfoerderung.conf → Next.js
```

## 🚀 Management

### WordPress verwalten:
- **Keine Änderungen** durch Next.js-Projekt
- Läuft komplett unabhängig
- Eigene Updates, Backups, etc.

### Next.js verwalten:
```bash
# PM2 Status
pm2 status

# Logs
pm2 logs but-lernfoerderung

# Neustart
pm2 restart but-lernfoerderung
```

## ✅ Bestätigung

**WordPress wird NICHT von diesem Projekt angefasst:**
- ❌ Keine gemeinsamen Dateien
- ❌ Keine gemeinsamen Konfigurationen
- ❌ Keine gemeinsamen Datenbanken
- ❌ Keine gemeinsamen Ports (außer 80/443 für HTTP/HTTPS)
- ✅ Komplett getrennte DNS-Records
- ✅ Komplett getrennte Apache VirtualHosts

**Beide Projekte laufen parallel, aber komplett unabhängig voneinander!**

## 🌐 DNS-Konfiguration

### WordPress DNS:
```
dev.minilernkreis.de → 87.106.75.122
www.dev.minilernkreis.de → 87.106.75.122
```

### Next.js DNS:
```
but-lernfoerderung.de → 87.106.75.122
www.but-lernfoerderung.de → 87.106.75.122
```

**Wichtig:** Beide Domains zeigen auf die gleiche IP, aber Apache leitet basierend auf dem `ServerName` an das richtige Projekt weiter.

