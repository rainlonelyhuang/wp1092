import express from 'express'
import getNumber from '../core/getNumber'

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

const fs = require('fs')

const wrapper = (logPath => {
	const router = express.Router()
	
	function writeLog(str){
		const date = new Date()
		const data = str + ' ' + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "-" + ("0" + date.getHours()).slice(-2) + "-" + ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2) + '\n'
		fs.appendFile(logPath, data , function (err) {
			if (err)
				console.log(err);
			else
				console.log('Add log complete.');
		});
	}
	// Just call getNumber(true) to generate a random number for guessing game
	router.post('/start', (_, res) => {
	    const number = getNumber(true)
	    writeLog(`start number=${number}`)
		
	    res.json({ msg: 'The game has started.' })
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
			// console.log(number)
			let hint = 'Equal'
		  if (number > guessed){
			  hint = 'Bigger'
		  }
		  else if (number < guessed){
			  hint = 'Smaller'
		  }
		  if(hint === 'Equal'){
			  writeLog('end-game')
		  }
		  else{
			  writeLog(`guess ${guessed}`)
		  }
		  res.send({msg: `${hint}`})
	  }
	})

	// TODO: add router.post('/restart',...)
	router.post('/restart', (req, res) => {
		const number = getNumber(true)
	    writeLog(`restart number=${number}`)
		
		res.json({ msg: 'The game has restarted.' })
	})
	return router
})

export default wrapper