const fs = require('fs');
const lilPath = `${__dirname}/src/lil.css`;

fs.writeFileSync(lilPath, '');

function read (name, index) {
  const path = `${__dirname}/src/${name.toLowerCase()}/style.css`;
  const options = { encoding:'utf8', flag:'r' };
  const content = fs.readFileSync(path, options);
  const comment = index === 0
    ? `/* ${name} -------------------------------- */\r\n`
    : `\r\n/* ${name} -------------------------------- */\r\n`;
  const data = comment + content;
  fs.appendFileSync(lilPath, data);
}

const components = ['Button', 'Card', 'Code', 'Form', 'Grid', 'List', 'Navigation', 'Table'];

for (let i = 0; i < components.length; i++) {
 read(components[i], i)
}
