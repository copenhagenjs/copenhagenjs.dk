const { readdirSync, readFileSync, writeFileSync } = require('fs')
const fm = require('front-matter')

const files = readdirSync('./_posts/')

async function main() {
  let allSpeakers = []
  for (let file in files) {
    let speakerList
    const split = files[file].split('.')
    const fileEnding = split[split.length - 1]
    if (fileEnding !== 'md') continue

    const raw = readFileSync('./_posts/' + files[file], 'utf8')
    const content = fm(raw)

    if (typeof content.attributes.speakers !== 'undefined') {
      console.log(content.attributes.speakers)
      speakerList = {
        src: files[file],
        speakers: content.attributes.speakers
      }
      allSpeakers.push(speakerList)
    }
  }
  console.log(
    `Found ${allSpeakers.length} speaker tags, ${files.length -
      allSpeakers.length} are missing`
  )

  writeFileSync('./static/speakers.json', JSON.stringify(allSpeakers))
}

main()
