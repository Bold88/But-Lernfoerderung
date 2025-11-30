# Design-Dokumentation: Architekten-Style Modernisierung

## 🎯 Design-Konzept

Die Website wurde komplett im **Architekten-Style** modernisiert:
- **Minimalistisch & klar**: Viel Whitespace, präzise Layouts
- **Hochwertig**: Strukturiert wie von einem Architekten entworfen
- **Modern**: Smooth Scroll-Animationen, Micro-Interactions, Transitions

---

## 📐 Funnel-Struktur & User Journey

### **FUNNEL STEP 1: HERO** → Erste Aufmerksamkeit
- **Ziel**: Sofortige Klarheit über das Angebot
- **CTA**: "Jetzt Anspruch prüfen" (Primär) + "Mehr über BuT erfahren" (Sekundär)
- **Vertrauensindikatoren**: DSGVO-konform, Keine Unterlagen, 100% kostenlos

### **FUNNEL STEP 2: INFORMATION** → Was ist BuT?
- **Ziel**: Bildung & Vertrauen aufbauen
- **4 Info-Karten**: Wer hat Anspruch? / Welche Leistungen? / Was bringt es? / Wie läuft der Prozess?
- **Effekt**: Nutzer verstehen das Angebot, Vertrauen wird aufgebaut

### **FUNNEL STEP 3: CHECK** → Interaktion & Qualifizierung
- **Ziel**: Nutzer interagieren, Leads qualifizieren
- **4 Fragen**: Jobcenter, Sozialamt, Kinderzuschlag, AsylbLG
- **Ergebnis**: Automatische Weiterleitung zum Formular bei wahrscheinlichem Anspruch
- **Lead-Qualifizierung**: Nur qualifizierte Leads kommen zum Formular

### **FUNNEL STEP 4: VERTRAUEN** → Warum über uns?
- **Ziel**: Letzte Bedenken ausräumen
- **4 Vorteile**: Geprüfte Anbieter, Qualifizierte Lehrkräfte, Schulnahe Förderung, Schnelle Vermittlung
- **Testimonials**: 2 Erfahrungsberichte (Elternsicht, Schülersicht)

### **FUNNEL STEP 5: LEAD-FORMULAR** → Konversion
- **Ziel**: Lead-Generierung
- **Nur sichtbar nach Check**: Formular erscheint erst nach Check-Abschluss
- **Klarer CTA**: "Kostenlose Beratung anfordern"
- **Persönlicher Hinweis**: "Wir melden uns persönlich und helfen Ihnen beim nächsten Schritt"

### **FUNNEL STEP 6: FAQ** → Absicherung
- **Ziel**: Letzte Fragen klären, Vertrauen stärken
- **4 häufige Fragen**: Accordion-Design mit sanften Übergängen

---

## 🎨 Design-Features

### **Scroll-Animationen**
- **Intersection Observer**: Elemente faden ein und schieben von unten hoch
- **Timing**: 0.8s mit cubic-bezier für smooth Animation
- **Trigger**: Bei 10% Sichtbarkeit

### **Micro-Interactions**
- **Buttons**: Hover-Effekt mit Slide-Animation (weißer Overlay)
- **Cards**: Hover → translateY(-8px) + Shadow
- **Form-Felder**: Focus → Border-Color-Change + Shadow + translateY(-2px)
- **FAQ**: Accordion mit rotierendem "+" Icon

### **Typografie**
- **Font**: Inter (Google Fonts)
- **Headlines**: 900 weight, große Schriftgrößen (clamp für responsive)
- **Letter-Spacing**: -0.02em bis -0.04em für moderne Optik

### **Farben**
- **Primär**: #1a1a1a (Schwarz) - seriös, hochwertig
- **Hintergrund**: #ffffff / #fafafa (Weiß/Grau) - viel Whitespace
- **Akzente**: Dezente Grautöne (#6a6a6a, #e0e0e0)
- **CTAs**: Schwarz auf Weiß, Weiß auf Schwarz

### **Layout**
- **Max-Width**: 1400px Container
- **Padding**: Großzügig (3rem Standard, 10rem bei Sections)
- **Gaps**: 3rem zwischen Elementen
- **Border-Radius**: 8px-24px (moderne, abgerundete Ecken)

---

## 🔄 Animationen & Effekte

### **Scroll-Animationen** (Intersection Observer)
```javascript
// In page.tsx implementiert
// Alle Sections faden ein beim Scrollen
// Initial: opacity: 0, transform: translateY(40px)
// Visible: opacity: 1, transform: translateY(0)
```

### **Hover-Effekte**
- **Cards**: translateY(-8px) + Shadow + Border-Color-Change
- **Buttons**: Slide-Animation (weißer Overlay von links)
- **Icons**: Scale(1.1) bei Hover

### **Focus-States**
- **Form-Felder**: Border-Color-Change + Shadow + translateY(-2px)
- **Accessibility**: Klare Focus-Indikatoren

---

## 📱 Responsive Design

### **Breakpoints**
- **Desktop**: > 1024px (Standard-Layout)
- **Tablet**: 768px - 1024px (2-Spalten → 1-Spalte)
- **Mobile**: < 768px (Stack-Layout, kleinere Paddings)
- **Small Mobile**: < 480px (Kompakte Schriftgrößen)

### **Mobile-First**
- Alle Grids: `repeat(auto-fit, minmax(300px, 1fr))`
- Flexible Schriftgrößen: `clamp()` für responsive Typography
- Touch-optimiert: Größere Buttons, mehr Abstand

---

## 🎯 Lead-Generierung: Wo werden Leads generiert?

### **Primärer Lead-Punkt**: 
**Check-Section → Formular** (nach erfolgreichem Check)
- Nutzer führt Check durch
- Bei wahrscheinlichem Anspruch → Formular erscheint
- **Qualifizierte Leads**: Nur Nutzer mit wahrscheinlichem Anspruch

### **Sekundärer Lead-Punkt**:
**Lead-Section** (auch ohne Check erreichbar)
- Direkter Link zum Formular möglich
- Aber: Formular-Prompt zeigt, dass Check empfohlen wird

### **Lead-Qualifizierung**:
- Check-Antworten werden an Formular übergeben
- Relevante "Ja"-Antworten gehen automatisch mit
- **Bessere Lead-Qualität**: Nur interessierte, qualifizierte Nutzer

---

## 🚀 Performance-Optimierungen

- **CSS-Transitions**: Hardware-accelerated (transform, opacity)
- **Intersection Observer**: Performanter als Scroll-Listener
- **Lazy Loading**: Animationen nur bei Sichtbarkeit
- **Minimaler JavaScript**: Nur für Scroll-Animationen

---

## 📝 Copy & Microcopy

### **Hero**
- Headline: "Bildung & Teilhabe: Chancen für Ihr Kind nutzen"
- Subheadline: Klar, einfach, elternfreundlich
- CTA: "Jetzt Anspruch prüfen" (klar, handlungsorientiert)

### **CTAs**
- Primär: "Jetzt Anspruch prüfen"
- Sekundär: "Mehr über BuT erfahren"
- Formular: "Kostenlose Beratung anfordern" (statt "Absenden")

### **Vertrauen**
- "Wir melden uns persönlich und helfen Ihnen beim nächsten Schritt"
- "Geprüfte Anbieter • Qualität statt Zufall"
- "Meist erhalten Sie innerhalb von 24–48 Stunden eine Rückmeldung"

---

## 🔧 Technische Details

### **Frameworks**
- Next.js (React)
- TypeScript
- CSS Modules (globals.css)

### **Animationen**
- CSS Transitions & Transforms
- Intersection Observer API
- Cubic-bezier Easing für smooth Animationen

### **Accessibility**
- Semantic HTML
- ARIA-Labels wo nötig
- Focus-States für alle interaktiven Elemente
- Keyboard-Navigation unterstützt

---

## ✅ Checkliste: Was wurde umgesetzt?

- [x] Architekten-Style Design (minimalistisch, klar, hochwertig)
- [x] Klare Funnel-Struktur (6 Steps)
- [x] Scroll-Animationen (Fade-In + Slide-Up)
- [x] Micro-Interactions (Hover, Focus, Transitions)
- [x] Responsive Design (Mobile-First)
- [x] Viel Whitespace & klare Typografie
- [x] Lead-Generierung optimiert (Check → Formular)
- [x] Moderne UI-Elemente (Cards, Accordions, Buttons)
- [x] Performance-optimiert
- [x] Accessibility-Features

---

## 🎓 Nächste Schritte

1. **Testen**: Auf verschiedenen Geräten testen
2. **Anpassen**: Copy nach Bedarf anpassen
3. **Tracking**: Google Analytics / Conversion-Tracking einbauen
4. **A/B-Testing**: Verschiedene CTA-Texte testen
5. **Optimierung**: Basierend auf User-Feedback optimieren

---

**Erstellt**: 2024
**Design-Stil**: Architekten-Style (minimalistisch, klar, hochwertig)
**Funnel-Orientierung**: Information → Vertrauen → Check → Kontakt

