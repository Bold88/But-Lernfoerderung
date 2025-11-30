# Dashboard-Verbindung Test

## Funktionsweise

### 1. Kontaktformular → API
- **Route:** `/api/contact` (POST)
- **Speichert in:** `data/contacts.json`
- **Felder:** Alle Formularfelder + butAnswers

### 2. Dashboard → API
- **Route:** `/api/admin/contacts` (GET)
- **Lädt aus:** `data/contacts.json`
- **Sortierung:** Neueste zuerst

## Test-Anleitung

1. **Kontaktformular ausfüllen:**
   - Gehen Sie auf die Homepage
   - Führen Sie den BuT-Check durch
   - Füllen Sie das Kontaktformular aus
   - Absenden

2. **Prüfen ob gespeichert:**
   ```bash
   cat data/contacts.json
   ```
   Die Datei sollte die neue Anfrage enthalten.

3. **Dashboard prüfen:**
   - Gehen Sie zu `/admin/login`
   - Loggen Sie sich ein (siehe ADMIN_CREDENTIALS.md)
   - Die Anfrage sollte in der Liste erscheinen

## Fehlerbehebung

- **Anfrage erscheint nicht:** Prüfen Sie die Browser-Konsole auf Fehler
- **API-Fehler:** Prüfen Sie die Server-Logs
- **Datei nicht erstellt:** Prüfen Sie die Berechtigungen im `data/` Verzeichnis

