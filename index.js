const fs = require('fs');

class Build {
  petitPath = `${__dirname}/src/petit.css`
  options = { encoding:'utf8', flag:'r' }
  components = ['Colors', 'Button', 'Card', 'Code', 'Form', 'Grid', 'List', 'Navigation', 'Table', 'Typography']

  static main () {
    const builder = new Build()
    builder.openTargetFile().readComponents()
  }

  openTargetFile () {
    fs.writeFileSync(this.petitPath, '');
    return this
  }

  readComponents () {
    for (let i = 0; i < this.components.length; i++) {
      this.readComponent(this.components[i], i)
    }
  }

  readComponent (name, index) {
    const filePath = this.getFilePath(name)
    const fileContent = this.getFileContent(filePath)
    const formattedContent = this.getFormattedContent(fileContent)
    const fileComment = this.getFileComment(name, index)
    this.setTarget(fileComment, formattedContent)
  }

  getFilePath (name) {
    return `${__dirname}/src/${name.toLowerCase()}/style.css`;
  }

  getFileContent (path) {
    return fs.readFileSync(path, this.options);
  }

  getFormattedContent (content) {
    return content
      .split('\n')
      .filter(line => !line.includes('@import'))
      .join('\n')
  }

  getFileComment (name, index) {
    return index === 0
      ? `/* ${name} -------------------------------- */\r\n`
      : `\r\n/* ${name} -------------------------------- */\r\n`;
  }

  setTarget (comment, finalContent) {
    const data = comment + finalContent;
    fs.appendFileSync(this.petitPath, data);
  }
}

Build.main()

