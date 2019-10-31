const { readdirSync } = require('fs')

module.exports = {
  exportPathMap: function() {
    let pages = {
      '/': { page: '/' },
      '/events': { page: '/events' },
      '/videos': { page: '/videos' },
      '/video': { page: '/video' },
      '/about': { page: '/about' },
      '/speakers': { page: '/speakers' },
      '/speaker': { page: '/speaker' },
      '/guidelines': { page: '/guidelines' },
      '/login': { page: '/login' },
      '/search': { page: '/search' },
      '/contact': { page: '/contact' },
      '/learn': { page: '/learn' },
      '/profile': { page: '/profile' }
    }
    const archive = readdirSync('./pages/archive')
    for (let page in archive) {
      if (archive[page] !== '_data.json') {
        pages['/archive/' + archive[page].replace('.js', '')] = {
          page: '/archive/' + archive[page].replace('.js', '')
        }
      }
    }

    return pages
  }
}
