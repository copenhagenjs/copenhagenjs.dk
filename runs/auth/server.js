const http = require('http')

const PORT = process.env.PORT || 9000
http.createServer((req, res) => {
  res.end('Auth')
}).listen(PORT, () => console.log('Listening on localhost:' + PORT))
