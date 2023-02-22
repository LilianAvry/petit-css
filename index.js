const fs = require('fs');
const fse = require('fs-extra');
const ejs = require('ejs')

class WebsiteBuilder {
  buildWebsite () {
    // Render a set of data
    ejs.renderFile('./src/index.ejs', (error, data) => {
      // Write file
      fs.writeFile('./docs/index.html', data, (error) => {
        if (error === null) {
          console.log('Built successfully')
        } else {
          throw error
        }
      })
    })
  }

  copyAssets () {
    const srcDir = './src/assets'
    const destDir = './docs/assets'
    fse.copySync(srcDir, destDir, { overwrite: true }, (error) => {
      if (error) {
        throw error
      }
    });
  }

  main () {
    try {
      this.buildWebsite()
      this.copyAssets()
    } catch (error) {
      console.log(error)
    }
  }
}

const websiteBuilder = new WebsiteBuilder()
websiteBuilder.main()
