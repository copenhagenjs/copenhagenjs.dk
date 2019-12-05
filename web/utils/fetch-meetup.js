const argv = require('yargs')
  .option('id', {
    describe: 'meetup id to be fetched'
  })
  .option('file', {
    describe: 'save output if defined'
  })
  .demandOption(['id'])
  .help().argv
const fetch = require('node-fetch')
const { writeFileSync } = require('fs')

async function fetchEventData(id) {
  const req = await fetch(`https://api.meetup.com/copenhagenjs/events/${id}`)
  const {
    description,
    link,
    name,
    local_date,
    local_time,
    venue
  } = await req.json()
  return {
    description,
    link,
    name,
    local_date,
    local_time,
    venue
  }
}

function generateContent(description) {
  const markdownDescription = description
    .replace(/<br\/>/g, '\n')
    .replace(/<p>|<\/p>/g, '\n')
    .replace(/<a.*?>|<\/a>/g, '')

  const contentWithHeaders = markdownDescription
    .split('\n')
    .map(i => i.trim())
    .map(i =>
      i.includes('Schedule') || (i.length > 15 && i.includes('?')) // Length to fix schedule with questionsmark You?
        ? '## ' + i
        : i
    )
    .join('\n')

  return contentWithHeaders
}

async function main() {
  const id = argv.id

  const {
    description,
    link,
    name,
    local_date,
    local_time,
    venue
  } = await fetchEventData(id)

  const contentWithHeaders = generateContent(description)

  // if a meetup doesn't have a venue
  const location = venue ? `${venue.address_1}, ${venue.city}` : ''
  const output = `---
title: ${name}
type: meetup
location: ${location}
link: ${link}
date: ${local_date}T${local_time}:00
duration: 3
---

# ${name}

${contentWithHeaders}`

  console.log(output)
  if (argv.file) {
    writeFileSync(argv.file, output)
  }
}

main()
