# Admin-Zugangsdaten

## Superadmin-Konten

Die folgenden Superadmin-Konten wurden erstellt:

### 1. b.molor@minilernkreis.de
**Passwort:** `uz9fjMJGzUMDnvU*`

### 2. b.knetsch@minilernkreis.de
**Passwort:** `L4Zd*BMMTYA2gqkt`

---

## Wichtige Hinweise

⚠️ **Sicherheit:**
- Die Passwörter wurden beim ersten Start automatisch generiert
- Sie sind in `data/admin-passwords.txt` gespeichert (sollte nach dem ersten Zugriff gelöscht werden)
- Die Passwörter sind als SHA-256 Hash in `data/admins.json` gespeichert

🔐 **Login:**
- Login-Seite: `/admin/login`
- E-Mail-Adresse und Passwort eingeben
- Nach erfolgreichem Login werden Sie zum Dashboard weitergeleitet

📝 **Passwörter anzeigen:**
```bash
node scripts/show-admin-passwords.js
```

oder

```bash
cat data/admin-passwords.txt
```

---

## Technische Details

- **Authentifizierung:** SHA-256 Hash-basiert
- **Session:** Token-basiert (24 Stunden gültig)
- **Rolle:** superadmin
- **Speicherung:** `data/admins.json`

---

**Erstellt:** 2024-11-30
**Status:** Aktiv

