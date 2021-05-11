import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try{
    const {
      data: { msg }
    } = await instance.post('/start')
    return msg
  }
  catch(error){
    console.log(error)
    return Promise.reject(error)
  }
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try{
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })

    return msg
  }
  catch(error){
    if (!error.response){
      console.log(error)
      return Promise.reject(error)
    }
    if(error.response.status === 400){
      const {
        data: { msg }
      } = await instance.get('/guess', { params: { number } })
      return Promise.reject(error.response);
    }
  }
}

const restart = async () => {
  try{
    const {
      data: { msg }
    } = await instance.post('/restart')
    return msg
  }
  catch(error){
    console.log(error)
    return Promise.reject(error)
  }
}

export { startGame, guess, restart }
