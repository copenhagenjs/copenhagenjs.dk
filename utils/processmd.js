const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { promisify } = require('util')
const marked = promisify(require('marked'))
const fm = require('front-matter')

const files = readdirSync('./_posts/')

async function main() {
  for (let file in files) {
    const splitted = files[file].split('.')
    const fileEnding = splitted[splitted.length - 1]
    if (fileEnding !== 'md') return
    console.log(files[file])

    const raw = readFileSync('./_posts/' + files[file], 'utf8')
    const content = fm(raw)
    const html = await marked(content.body)

    writeFileSync(
      './pages/archive/' + files[file].replace('.md', '.js'),
      `
import Head from 'next/head'
import Page from '../../components/Page'
import Map from '../../components/Map'
export default () => (
  <Page>
    <Head>
      <title>${`${content.attributes.title} - CopenhagenJS` ||
        'CopenhagenJS Event'}</title>
    </Head>
    <style jsx>{\`
      .date {
        font-size: 1.5rem;
      }
      .description {
      }
      .description :global(h1) {
        margin: 5px 0;
      }
    \`}</style>
    <div className="date">
      ${content.attributes.date &&
        content.attributes.date.toLocaleString('da-DK')}
    </div>
    <div className="description" dangerouslySetInnerHTML={{__html: \`${html}\`}}></div>
    ${
      content.attributes.location
        ? `<Map location='${content.attributes.location}'/>`
        : ''
    }
  </Page> 
)
      `
    )
  }
}

main()
