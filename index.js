const fs = require('fs');
const petitPath = `${__dirname}/src/petit.css`;

fs.writeFileSync(petitPath, '');

function read (name, index) {
  const path = `${__dirname}/src/${name.toLowerCase()}/style.css`;
  const options = { encoding:'utf8', flag:'r' };
  const content = fs.readFileSync(path, options);
  const lines = content.split('\n')
  const finalContent = lines
    .filter(line => !line.includes('@import'))
    .join('\n')
  const comment = index === 0
    ? `/* ${name} -------------------------------- */\r\n`
    : `\r\n/* ${name} -------------------------------- */\r\n`;

  const data = comment + finalContent;
  fs.appendFileSync(petitPath, data);
}

const components = ['Colors', 'Button', 'Card', 'Code', 'Form', 'Grid', 'List', 'Navigation', 'Table', 'Typography'];

for (let i = 0; i < components.length; i++) {
 read(components[i], i)
}
