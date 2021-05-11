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
          const result = await startGame()
          if(result === "Network Error") {
            setStatus("Cannot connect to server! Game will start after server reload...")
          }
          setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          const result = await restart()
          if(result === "Network Error") {
            setStatus("Cannot connect to server! Game will start after server reload...")
            setHasWon(false)
            setNumber('')
          }
          else {
            setHasWon(false)
            setStatus('')
            setNumber('')
          }
          
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    try {
      const data = await guess(number)
      setStatus(`${data} than ${number}`)
      if(data === 'Equal') {
        setHasWon(true)
      }
    }
    catch (err) {
      console.log(err)
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
