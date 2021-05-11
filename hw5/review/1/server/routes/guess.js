import express from 'express'
import getNumber from '../core/getNumber'
import writeLog from '../core/writeLog'
var fs = require('fs')
const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  var number = getNumber(true)
  writeLog("start", number)
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: "Error: " + guessed + " is not a valid number (1 - 100)" })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if(guessed > number){
      res.send({ msg: 'Smaller' })
      writeLog("guess", guessed)
    }
    else if(guessed < number){
      res.send({ msg: 'Bigger' })
      writeLog("guess", guessed)
    }
    else{
      res.send({ msg: 'Equal' })
      writeLog("end")
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  var number = getNumber(true)
  writeLog("end")
  writeLog("restart", number)
  res.json({ msg: 'The game has restarted.' })
})

export default router
