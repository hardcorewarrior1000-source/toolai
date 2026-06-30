const fs = require('fs');
const c = fs.readFileSync('src/i18n/translations.ts', 'utf8');
const lines = c.split('\n');
const line = lines[858];
// Look for \u followed by non-hex or incomplete unicode
for (let i = 0; i < line.length - 1; i++) {
  if (line[i] === '\\') {
    const next = line[i + 1];
    if (next === 'u') {
      const hex = line.substring(i + 2, i + 6);
      if (hex.length < 4 || !/^[0-9a-fA-F]{4}$/.test(hex)) {
        console.log('Incomplete \\u at index', i, 'hex:', JSON.stringify(hex), 'context:', JSON.stringify(line.slice(Math.max(0, i - 15), i + 20)));
      }
    } else if (!'\\\"0nrtxu'.includes(next)) {
      console.log('Bad escape at index', i, '\\' + next, 'context:', JSON.stringify(line.slice(Math.max(0, i - 15), i + 20)));
    }
  }
}
