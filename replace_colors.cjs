const fs = require('fs');
const path = require('path');
const dir = 'd:/MY_PROJECTS/copyportfolio/portfolio-website/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Regex breakdown: optional "dark:" group, then word boundary, then tailwind prefix, then "-red-", then shade, then optional "/opacity".
    const regex = /(dark:)?\b(text|bg|border|from|to|fill|via)-red-(\d{3})(?:\/(\d+))?\b/g;

    content = content.replace(regex, (match, dark, prefix, shade, opacity) => {
        if (dark) return match; // Already processed or meant to be dark only

        let c = 'blue';
        if (shade === '500') c = 'orange';
        if (shade === '400') c = 'yellow';

        let op = opacity ? '/' + opacity : '';
        return `${prefix}-${c}-${shade}${op} dark:${prefix}-red-${shade}${op}`;
    });

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}
console.log('Replacement complete.');
