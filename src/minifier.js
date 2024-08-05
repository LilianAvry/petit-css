const fs = require('fs');
const CleanCSS = require('clean-css');

class Minifier {
    fileNames = ['normalize', 'petit']
    readingOptions = { encoding:'utf8', flag:'r' }
    writingOptions = { encoding:'utf8', flag:'w' }

    static main() {
        const minifier = new Minifier()
        const originalContent = minifier.getOriginalContent()
        const minifiedContent = minifier.getMinifiedContent(originalContent)
        minifier.saveMinifiedContent(minifiedContent)
    }

    getOriginalContent() {
        const list = {}

        this.fileNames.forEach((fileName) => {
            list[fileName] = fs.readFileSync(`${__dirname}/${fileName}.css`, this.readingOptions)
        })
        return list
    }

    getMinifiedContent(content) {
        const list = {}

        Object.entries(content).forEach(([fileName, input]) => {
            list[fileName] = new CleanCSS().minify(input).styles;
        })
        return list
    }

    saveMinifiedContent(content) {
        Object.entries(content).forEach(([fileName, input]) => {
            fs.writeFileSync(`${__dirname}/${fileName}.min.css`, input, this.writingOptions);
        })
    }
}

Minifier.main()
