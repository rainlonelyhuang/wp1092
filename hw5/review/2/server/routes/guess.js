import express from 'express'
import getNumber from '../core/getNumber'

const fs = require('fs')
const dateFormat = require('dateformat')
const fileName = dateFormat(process.env.BUILD_DATE, "yyyy-mm-dd-hh-MM")
const path = `${__dirname}/../log/${fileName}.log`

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
  const number = getNumber(true)
  const now = dateFormat(new Date(), "yyyy-mm-dd-hh-mm-ss")
  fs.appendFile(path, `start number=${number} ${now}\n`, err => {
    if (err) console.log(err)
  })
  res.json({ msg: 'The game has started.'})
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if(guessed === number) {
      fs.appendFile(path, `end game\n`, err => {
        if (err) console.log(err)
      })
      res.status(200).send({msg: 'Equal'})
    }
    else {
      const now = dateFormat(new Date(), "yyyy-mm-dd-hh-mm-ss")
      fs.appendFile(path, `guess ${guessed} ${now}\n`, err => {
        if (err) console.log(err)
      })
      res.status(200).send({msg: `${guessed > number ? 'Smaller' : 'Bigger'}`})
    }
  }
})

// TODO: add router.post('/restart',...)

router.post('/restart', (_, res) => {
  const number = getNumber(true)
  const now = dateFormat(new Date(), "yyyy-mm-dd-hh-mm-ss")
  fs.appendFile(path, `restart number=${number} ${now}\n`, err => {
    if (err) console.log(err)
  })
  res.json({ msg: 'The game has restarted.' })
})

export default router
