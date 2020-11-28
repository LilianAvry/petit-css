const fs = require('fs');

function read (directory) {
  const path = `${__dirname}/src/${directory}/style.css`;
  const options = { encoding:'utf8', flag:'r' };
  return fs.readFileSync(path, options)
}

const button = read('button');

console.log(button);
