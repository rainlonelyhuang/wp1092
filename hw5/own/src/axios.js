import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try{
	  const {
		data: { msg }
		} = await instance.post('/start')
	return msg
  }catch(error){
	  if(!error.response){
		  return ''
	  }
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
  }catch (error) {
		if(!error.response){
			return ''
		}
		if(error.response.status === 400){
			alert(`"${number}" is not a valid number (1 - 100)`)
		}
    }
}

const restart = async () => {
  try{
	const {
    data: { msg }
    } = await instance.post('/restart')
	return msg
  }catch(error){
	  if(!error.response){
			return ''
	  }
  }
}

export { startGame, guess, restart }
