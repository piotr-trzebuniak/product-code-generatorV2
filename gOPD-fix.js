const fs = require('fs');
const path = require('path');

const gopdPath = path.join(__dirname, 'node_modules', 'gopd');
const gopdFilePath = path.join(gopdPath, 'gOPD.js');

// Treść brakującego pliku
const fileContent = `'use strict';

module.exports = Object.getOwnPropertyDescriptor;
`;

// Sprawdź, czy katalog istnieje
if (!fs.existsSync(gopdPath)) {
  fs.mkdirSync(gopdPath, { recursive: true });
}

// Zapisz plik
fs.writeFileSync(gopdFilePath, fileContent);

console.log('Pomyślnie utworzono plik gOPD.js');