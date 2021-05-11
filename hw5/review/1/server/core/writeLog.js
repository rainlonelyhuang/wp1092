import getNumber from './getNumber'

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
var fs = require('fs')
var dir = 'server/log';
const writeLog = (status, number) => {

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  console.log(status)
  var datetime = new Date();
  let date = ("0" + datetime.getDate()).slice(-2);
  let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
  let year = datetime.getFullYear();
  let hours = addZero(datetime.getHours());
  let minutes = addZero(datetime.getMinutes());
  let seconds = addZero(datetime.getSeconds());
  let curTime = (year + "-" + month + "-" + date + "-" + hours + "-" + minutes + "-" + seconds);
  console.log(curTime)
  if(status === "start"){
    const content = "start number=" + number + " " + curTime
    fs.writeFileSync('server/log/' + curTime + ".log", content)
    console.log('Saved!');
  }
  else if(status === "guess"){
    let content = "guess " + number + " " + curTime
    fs.writeFileSync('server/log/' + curTime + ".log", content)
    console.log('Saved!');
  }
  else if(status === "restart"){
    let content = "restart number=" + number + " " + curTime
    fs.writeFileSync('server/log/' + curTime + ".log", content)
    console.log('Saved!');
  }
  else if(status === "end"){
    let content = "end-game"
    fs.writeFileSync('server/log/' + curTime + ".log", content)
    console.log('Saved!');
  }
}
export default writeLog