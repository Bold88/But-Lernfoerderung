# 🌐 DNS-Konfiguration für but-lernfoerderung.de

## 📋 DNS-Records die Sie eintragen müssen:

### Option 1: A-Records (Empfohlen)

**Bei Ihrem DNS-Provider (z.B. IONOS, Cloudflare, etc.) eintragen:**

```
Typ:  A
Name: but-lernfoerderung.de
Wert: 87.106.75.122
TTL:  3600 (oder Standard)

Typ:  A
Name: www.but-lernfoerderung.de
Wert: 87.106.75.122
TTL:  3600 (oder Standard)
```

### Option 2: A-Record + CNAME (Alternative)

```
Typ:  A
Name: but-lernfoerderung.de
Wert: 87.106.75.122
TTL:  3600

Typ:  CNAME
Name: www.but-lernfoerderung.de
Wert: but-lernfoerderung.de
TTL:  3600
```

## ✅ Apache ist bereits konfiguriert

Die Apache-Konfiguration akzeptiert bereits beide Domains:
- `but-lernfoerderung.de` (ServerName)
- `www.but-lernfoerderung.de` (ServerAlias)

## ⏱️ DNS-Propagierung

Nach dem Eintragen der DNS-Records:
- **Propagierung:** 15 Minuten bis 48 Stunden (meist 1-2 Stunden)
- **Prüfen:** `nslookup but-lernfoerderung.de` oder `dig but-lernfoerderung.de`

## 🔒 SSL-Zertifikat (nach DNS-Propagierung)

Sobald die DNS-Records propagiert sind, SSL installieren:

```bash
ssh root@87.106.75.122
apt-get install certbot python3-certbot-apache
certbot --apache -d but-lernfoerderung.de -d www.but-lernfoerderung.de
```

## 📝 Zusammenfassung

**Was Sie tun müssen:**
1. ✅ DNS-Records bei Ihrem Provider eintragen (siehe oben)
2. ⏳ Warten auf DNS-Propagierung (1-2 Stunden)
3. 🔒 SSL-Zertifikat installieren (siehe oben)
4. ✅ Website testen: `http://but-lernfoerderung.de`

**Server-IP:** `87.106.75.122`

**Apache ist bereits konfiguriert und wartet auf die DNS-Records!**

