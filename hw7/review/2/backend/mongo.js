const mongoose = require('mongoose');
const dotenv = require('dotenv-defaults');
// i use mongodb://localhost:27017/cardmongo for MONGO_URL

function connectMongo() {

  dotenv.config();

  if(!process.env.MONGO_URL){
    console.error("Missing MONGO URL!!!!");
    process.exit(1);
  }

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () { //db open 的時候執行一次
    console.log('Mongo database connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

module.exports = mongo;
