const http = require('http')
const admin = require('firebase-admin')
console.log(admin.credential.applicationDefault())
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'copenhagenjsdk',
  databaseURL: 'https://copenhagenjs.firebaseio.com'
})

const PORT = process.env.PORT || 9000
http
  .createServer((req, res) => {
    console.log('New connection', req.url)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')

    if (req.method === 'OPTIONS') {
      return res.end('OK')
    }
    if (req.url === '/token') {
      let data = []
      req.on('data', chunk => {
        data.push(chunk)
      })
      req.on('end', () => {
        const json = JSON.parse(data)
        admin
          .auth()
          .verifyIdToken(json.token)
          .then(function(decodedToken) {
            let uid = decodedToken.uid
            console.log({ uid })
            res.end('Firebase Token ' + uid)
          })
          .catch(function(error) {
            console.log(error)
          })
      })
    } else {
      res.end('Auth')
    }
  })
  .listen(PORT, () => console.log('Listening on localhost:' + PORT))
