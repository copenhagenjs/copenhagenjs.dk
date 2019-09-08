const { readdirSync, writeFileSync } = require('fs')

const dirs = readdirSync('./_posts').filter(a => a !== '_data.json')
const data = {
  posts: dirs
}
writeFileSync('./_posts/_data.json', JSON.stringify(data, null, 2) + '\n')
