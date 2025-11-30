# GitHub Repository Setup

## Repository wurde lokal vorbereitet

Das Projekt wurde für GitHub vorbereitet:

- ✅ Git initialisiert
- ✅ Alle Dateien committed
- ✅ .gitignore konfiguriert (data/ wird ignoriert)

## GitHub Repository erstellen

### Option 1: Über GitHub Website

1. Gehen Sie zu https://github.com/new
2. Repository-Name: `But-Lernfoerderung`
3. Beschreibung: "Website für kostenlose Nachhilfe durch Bildung und Teilhabe (BuT)"
4. Öffentlich oder Privat wählen
5. **NICHT** "Initialize with README" auswählen
6. Klicken Sie auf "Create repository"

### Option 2: Über GitHub CLI (falls installiert)

```bash
cd /Users/dilanmolor/but-lernfoerderung
gh repo create But-Lernfoerderung --public --source=. --remote=origin --push
```

## Code auf GitHub hochladen

Nachdem das Repository erstellt wurde, führen Sie aus:

```bash
cd /Users/dilanmolor/but-lernfoerderung
git remote add origin https://github.com/IHR-USERNAME/But-Lernfoerderung.git
git push -u origin main
```

**Wichtig:** Ersetzen Sie `IHR-USERNAME` mit Ihrem GitHub-Benutzernamen.

## Dashboard-Verbindung prüfen

Die Anfragen werden korrekt gespeichert und im Dashboard angezeigt:

1. **Kontaktformular** → `/api/contact` (POST) → speichert in `data/contacts.json`
2. **Dashboard** → `/api/admin/contacts` (GET) → lädt aus `data/contacts.json`

### Testen:

1. Füllen Sie das Kontaktformular auf der Website aus
2. Prüfen Sie, ob die Datei `data/contacts.json` erstellt/aktualisiert wurde
3. Loggen Sie sich im Admin-Dashboard ein
4. Die Anfrage sollte in der Liste erscheinen

## Wichtige Dateien

- `data/contacts.json` - Gespeicherte Kontaktanfragen (wird von Git ignoriert)
- `data/admins.json` - Admin-Konten (wird von Git ignoriert)
- `ADMIN_CREDENTIALS.md` - Admin-Zugangsdaten (sollte nach dem ersten Zugriff gelöscht werden)

