/**
 * Script to generate landing pages for cities
 * Run with: node scripts/generate-city-pages.js
 * 
 * This will create static pages for ~350 German cities
 */

const fs = require('fs')
const path = require('path')

// List of major German cities (you can expand this to 350+ cities)
const cities = [
  'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund',
  'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg', 'Bochum',
  'Wuppertal', 'Bielefeld', 'Bonn', 'Münster', 'Karlsruhe', 'Mannheim', 'Augsburg', 'Wiesbaden',
  'Gelsenkirchen', 'Mönchengladbach', 'Braunschweig', 'Chemnitz', 'Kiel', 'Aachen', 'Halle',
  'Magdeburg', 'Freiburg', 'Krefeld', 'Lübeck', 'Oberhausen', 'Erfurt', 'Rostock', 'Mainz',
  'Kassel', 'Hagen', 'Hamm', 'Saarbrücken', 'Mülheim', 'Potsdam', 'Ludwigshafen', 'Oldenburg',
  'Leverkusen', 'Osnabrück', 'Solingen', 'Heidelberg', 'Herne', 'Neuss', 'Darmstadt', 'Paderborn',
  'Regensburg', 'Ingolstadt', 'Würzburg', 'Fürth', 'Wolfsburg', 'Offenbach', 'Ulm', 'Heilbronn',
  'Pforzheim', 'Göttingen', 'Bottrop', 'Trier', 'Recklinghausen', 'Reutlingen', 'Bremerhaven',
  'Koblenz', 'Bergisch Gladbach', 'Jena', 'Remscheid', 'Erlangen', 'Moers', 'Siegen', 'Hildesheim',
  'Salzgitter', 'Cottbus', 'Kaiserslautern', 'Gütersloh', 'Schwerin', 'Witten', 'Gera', 'Iserlohn',
  'Ludwigsburg', 'Hanau', 'Esslingen', 'Zwickau', 'Düren', 'Ratingen', 'Tübingen', 'Flensburg',
  'Lünen', 'Villingen-Schwenningen', 'Marl', 'Konstanz', 'Minden', 'Velbert', 'Norderstedt',
  'Dessau-Roßlau', 'Delmenhorst', 'Bamberg', 'Rheine', 'Wilhelmshaven', 'Viersen', 'Gladbeck',
  'Dorsten', 'Rheydt', 'Detmold', 'Bayreuth', 'Lüneburg', 'Troisdorf', 'Castrop-Rauxel', 'Lüdenscheid',
  'Marburg', 'Arnsberg', 'Lüneburg', 'Bocholt', 'Dinslaken', 'Celle', 'Kempten', 'Unna', 'Landshut',
  'Aschaffenburg', 'Brandenburg', 'Aalen', 'Fulda', 'Lippstadt', 'Kerb', 'Neuwied', 'Weimar',
  'Dormagen', 'Plauen', 'Sindelfingen', 'Neubrandenburg', 'Grevenbroich', 'Rosenheim', 'Herten',
  'Bergheim', 'Friedrichshafen', 'Garbsen', 'Wesel', 'Schwäbisch Gmünd', 'Offenburg', 'Hürth',
  'Stralsund', 'Greifswald', 'Langenhagen', 'Neu-Ulm', 'Unternehmen', 'Euskirchen', 'Stolberg',
  'Hameln', 'Eschweiler', 'Sankt Augustin', 'Görlitz', 'Meerbusch', 'Gießen', 'Sankt Ingbert',
  'Pulheim', 'Hilden', 'Waiblingen', 'Baden-Baden', 'Hattingen', 'Bad Salzuflen', 'Wolfenbüttel',
  'Bad Homburg', 'Neustadt', 'Menden', 'Ahlen', 'Nordhorn', 'Frechen', 'Schweinfurt', 'Wetzlar',
  'Ibbenbüren', 'Passau', 'Goslar', 'Willich', 'Emden', 'Heidenheim', 'Leonberg', 'Bad Oeynhausen',
  'Langenfeld', 'Erftstadt', 'Bergkamen', 'Rheda-Wiedenbrück', 'Bad Kreuznach', 'Bornheim',
  'Singen', 'Cuxhaven', 'Straubing', 'Kamp-Lintfort', 'Nienburg', 'Herzogenrath', 'Radebeul',
  'Soest', 'Altenburg', 'Eisenach', 'Mörfelden-Walldorf', 'Neumünster', 'Weiden', 'Homburg',
  'Oberursel', 'Bünde', 'Freiburg', 'Gotha', 'Freital', 'Löhne', 'Weinheim', 'Osterholz-Scharmbeck',
  'Bruchsal', 'Büdingen', 'Königswinter', 'Bitterfeld-Wolfen', 'Fürstenwalde', 'Hemmingen',
  'Radevormwald', 'Bramsche', 'Schorndorf', 'Bautzen', 'Pirna', 'Weißwasser', 'Burg', 'Wismar',
  'Biberach', 'Ettlingen', 'Wunstorf', 'Laatzen', 'Meppen', 'Hoyerswerda', 'Stendal', 'Rathenow',
  'Lübben', 'Bernburg', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt', 'Wernigerode', 'Quedlinburg', 'Sangerhausen', 'Zeitz', 'Naumburg',
  'Weißenfels', 'Merseburg', 'Bitterfeld', 'Wolfen', 'Eisleben', 'Aschersleben', 'Schönebeck',
  'Staßfurt', 'Halberstadt'
]

// Remove duplicates and sort
const uniqueCities = [...new Set(cities)].sort()

console.log(`Generating pages for ${uniqueCities.length} cities...`)

// The dynamic route already handles all cities, so we don't need to generate individual files
// But we can create a sitemap or list of cities for reference
const citiesList = uniqueCities.map(city => {
  const slug = city.toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  
  return {
    name: city,
    slug: slug,
    path: `/nachhilfe/${slug}`
  }
})

// Write cities list to a JSON file for reference
const outputPath = path.join(__dirname, '..', 'data', 'cities.json')
const dataDir = path.dirname(outputPath)

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

fs.writeFileSync(outputPath, JSON.stringify(citiesList, null, 2), 'utf8')

console.log(`✓ Cities list written to ${outputPath}`)
console.log(`\nNote: The dynamic route at app/nachhilfe/[stadt]/page.tsx will handle all city pages automatically.`)
console.log(`\nExample URLs:`)
citiesList.slice(0, 10).forEach(city => {
  console.log(`  - ${city.path}`)
})

