import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  
  try {
    const {
      data: { msg }
    } = await instance.post('/start')

    return msg
  }
  catch (err) {
    if(err.message === "Network Error") {
      return err.message
    }
  }
  
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try {
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    
    return msg
  }
  catch (err) {
    if(err.message === "Network Error") {
      return err.message
    }
    else {
      console.log(`Error: "${number}" is not a valid number (1 - 100)`)
      return "Please guess between 1 - 100 !!!"
    }
  }

}

const restart = async () => {

  try {
    const {
      data: { msg }
    } = await instance.post('/restart')
  
    return msg
  }
  catch (err) {
    if(err.message === "Network Error") {
      return err.message
    }
  }
  
}

export { startGame, guess, restart }
