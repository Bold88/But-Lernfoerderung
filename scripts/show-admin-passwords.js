#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PASSWORDS_FILE = path.join(DATA_DIR, 'admin-passwords.txt');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

console.log('\n=== ADMIN PASSWÖRTER ===\n');

if (fs.existsSync(PASSWORDS_FILE)) {
  const content = fs.readFileSync(PASSWORDS_FILE, 'utf-8');
  console.log(content);
} else if (fs.existsSync(ADMINS_FILE)) {
  const admins = JSON.parse(fs.readFileSync(ADMINS_FILE, 'utf-8'));
  console.log('Admins wurden bereits initialisiert, aber Passwörter-Datei wurde gelöscht.\n');
  console.log('Bestehende Admin-Konten:');
  admins.forEach(admin => {
    console.log(`  • ${admin.email} (${admin.role})`);
  });
  console.log('\nUm neue Passwörter zu generieren, löschen Sie data/admins.json und starten Sie den Server neu.\n');
} else {
  console.log('Noch keine Admins initialisiert.');
  console.log('Die Admins werden beim ersten Login automatisch erstellt.');
  console.log('Rufen Sie /api/admin/auth mit GET auf, um die Passwörter zu erhalten.\n');
}

