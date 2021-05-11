let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if(number === undefined || forceRestart === true){
    const min = 1
    const max = 100
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return number
}

export default getNumber
