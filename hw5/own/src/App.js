import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
			const msg = await startGame()
			if(msg === ''){
				setStatus('Server not responding or not connected')
			}
			else{
				setHasStarted(true)
				setStatus('')
			}
        }}
      >
        start game
      </button>
	  <p>{status}</p>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          const msg = await restart()
		  if(msg === ''){
			  setStatus('Server not responding or not connected')
		  }
		  else{
			  setHasWon(false)
			  setStatus('')
			  setNumber('')
		  }
        }}
      >
        restart
      </button>
	  <p>{status}</p>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
	  let hint = await guess(number)
	  if(hint === ''){
		  hint = 'Server not responding or not connected'
	  }
	  if(hint === 'Equal'){
		  setHasWon(true)
		  setStatus('')
	  }
	  else{
		setStatus(hint)
	  }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
