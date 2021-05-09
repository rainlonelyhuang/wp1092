import express from 'express'
import cors from 'cors'
import path from 'path'

import guessRoute from './routes/guess'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()
const fs = require('fs')
var date = new Date()

const logPath = path.join(__dirname, 'log', date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "-" + ("0" + date.getHours()).slice(-2) + "-" + ("0" + date.getMinutes()).slice(-2) + ".log")

if (!fs.existsSync(path.join(__dirname, 'log'))){
	fs.mkdirSync(path.join(__dirname, 'log'))
}

fs.writeFile(logPath, '', function(err){
	if(err){
		console.log(err)
	}
	else{
		console.log('Log file created.')
	}
})

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute(logPath))

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
