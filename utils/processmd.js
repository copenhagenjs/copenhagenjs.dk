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
import Event from '../../components/Event'

export default () => (
  <Page>
    <Head>
      <title>${`${content.attributes.title} - CopenhagenJS` ||
        'CopenhagenJS Event'}</title>
    </Head>
    <Event
      title="${content.attributes.title || ''}"
      date="${content.attributes.date || ''}"
      html={\`${html}\`}
      location="${content.attributes.location || ''}"
      speakers={${JSON.stringify(content.attributes.speakers)}}
      link="${content.attributes.link || ''}"
    />
  </Page> 
)
      `
    )
  }
}

main()
