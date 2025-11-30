# 🚀 Installation OHNE GitHub

## Schritt-für-Schritt Anleitung

### Schritt 1: Projektdateien auf Server kopieren

**Option A: Mit SCP (vom lokalen Rechner)**

```bash
# Vom lokalen Rechner aus:
cd /Users/dilanmolor
scp but-lernfoerderung.tar.gz root@87.106.75.122:/tmp/
```

**Option B: Mit SFTP oder FileZilla**

- Verbinden Sie sich mit dem Server
- Kopieren Sie `but-lernfoerderung.tar.gz` nach `/tmp/` auf dem Server

### Schritt 2: Auf Server verbinden

```bash
ssh root@87.106.75.122
# Passwort: 2hq9Oi33
```

### Schritt 3: Projekt entpacken

```bash
# Entpacke Projekt
mkdir -p /var/www/but-lernfoerderung
cd /var/www/but-lernfoerderung
tar -xzf /tmp/but-lernfoerderung.tar.gz
```

### Schritt 4: Installations-Skript ausführen

```bash
# Skript ausführbar machen
chmod +x install-direct.sh

# Installation starten
./install-direct.sh
```

Das Skript macht automatisch:
- ✅ Backup der Apache-Konfiguration
- ✅ Installation von Node.js und PM2
- ✅ Installation der Dependencies
- ✅ Build des Projekts
- ✅ Start mit PM2
- ✅ Apache-Konfiguration für Next.js
- ✅ WordPress bleibt unverändert!

### Schritt 5: Prüfen

```bash
# PM2 Status
pm2 status

# Next.js testen
curl http://localhost:3000

# Apache testen
apache2ctl configtest
```

---

## ✅ Fertig!

- **Next.js läuft auf:** `http://localhost:3000`
- **Apache leitet weiter:** `but-lernfoerderung.de` → Next.js
- **WordPress bleibt unverändert:** `minilernkreis.de`

---

## 📝 Hinweis zu GitHub

**GitHub ist NICHT mehr nötig für den Betrieb!**

Nach der Installation läuft alles lokal auf dem Server. GitHub können Sie weiterhin nutzen für:
- ✅ Backup der Projektdateien
- ✅ Versionskontrolle
- ✅ Updates (optional)

Aber für den Betrieb der Website ist GitHub nicht erforderlich.

