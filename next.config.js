const { readdirSync } = require("fs");

module.exports = {
  exportPathMap: function() {
    let pages = {
      '/': { page: '/' },
      '/events': {page: '/events'}
    }
    const archive = readdirSync('./pages/archive')
    for (let page in archive) {
      if(archive[page] !== '_data.json') {
        pages['/archive/' + archive[page].replace('.js', '')] = {
          page: '/archive/' + archive[page].replace('.js', '')
        }
      }
    }
    console.log(pages)
    return pages
  }
}
