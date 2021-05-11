import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [isError, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  let msg = "Error: Server not responding or not connected";

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          try{
            await startGame()
            //await writeLog()
            setHasStarted(true)
          }
          catch(error){
            console.log("Error: Server not responding or not connected");
            setError(true)
          }
        }}
      >
        start game
      </button>
      <p>{isError? msg : "" }</p>
    </div>
  )

  const display = (
    <>
      <p>Please reconnect to server</p>
    </>

  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          try{
            await restart()
            setHasWon(false)
            setStatus('')
            setNumber('')
            setError(false)
          }
          catch(error){
            console.log("Error: Server not responding or not connected");
            setError(true)
          }
        }}
      >
        restart
      </button>
      <p>{isError ? msg : "" }</p>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async(e) => {
    try{
      const res = await guess(number)
      setStatus(res)
      setError(false)
      if(res === "Equal"){
        setHasWon(true)
      }
    }
    catch(error){
      if(!error.response){
        console.log(msg)
        setError(true)
        setErrMsg(msg)
      }
      else{
        console.log(error.response.data.msg)
        setError(true)
        setErrMsg(error.response.data.msg)
      }
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
      <p>{isError ? errMsg : status}</p>
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
