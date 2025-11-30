# 🚀 Schnell-Installation auf VPS

## Einfach diese Befehle auf dem Server ausführen:

```bash
# 1. Auf Server verbinden
ssh root@87.106.75.122
# Passwort: 2hq9Oi33

# 2. Skript von GitHub herunterladen und ausführen
curl -o /tmp/install.sh https://raw.githubusercontent.com/Bold88/But-Lernfoerderung/main/install-on-server.sh
chmod +x /tmp/install.sh
/tmp/install.sh
```

Das war's! Das Skript macht alles automatisch.

---

## ✅ Nach der Installation prüfen:

```bash
# PM2 Status
pm2 status

# Next.js testen
curl http://localhost:3000

# Apache-Konfiguration testen
apache2ctl configtest
```

---

## 🔒 SSL installieren (später):

```bash
sudo apt-get install certbot python3-certbot-apache
sudo certbot --apache -d but-lernfoerderung.de -d www.but-lernfoerderung.de
```

---

**WordPress bleibt komplett unverändert!** ✓

