# GitHub Authentifizierung & Repository-Erstellung

## Schritt 1: GitHub CLI Authentifizierung

Führen Sie im Terminal aus:

```bash
gh auth login
```

Folgen Sie den Anweisungen:
1. Wählen Sie "GitHub.com"
2. Wählen Sie "HTTPS" oder "SSH"
3. Authentifizieren Sie sich (Browser oder Token)

## Schritt 2: Repository erstellen

Nach erfolgreicher Authentifizierung führe ich automatisch aus:

```bash
cd /Users/dilanmolor/but-lernfoerderung
gh repo create But-Lernfoerderung --public --source=. --remote=origin --push
```

## Alternative: Manuell über GitHub Website

1. Gehen Sie zu: https://github.com/new
2. Repository-Name: `But-Lernfoerderung`
3. Beschreibung: "Website für kostenlose Nachhilfe durch Bildung und Teilhabe (BuT)"
4. Öffentlich oder Privat wählen
5. **NICHT** "Initialize with README" auswählen
6. Klicken Sie auf "Create repository"

Dann im Terminal:

```bash
cd /Users/dilanmolor/but-lernfoerderung
git remote add origin https://github.com/IHR-USERNAME/But-Lernfoerderung.git
git push -u origin main
```

