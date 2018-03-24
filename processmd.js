const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { promisify } = require('util')
const marked = promisify(require('marked'))

const files = readdirSync('./_posts/')

async function main() {
  for (let file in files) {
    if (file === '_data.json') return
    const content = readFileSync('./_posts/' + files[file], 'utf8')
    const html = await marked(
      content
        .split('---')
        .splice(2)
        .join('')
    )
    writeFileSync(
      './pages/archive/' + files[file].replace('.md', '.js'),
      `import Page from '../../components/Page'
        export default () => ( <Page>${html}</Page> )
      `
    )
  }
}

main()
