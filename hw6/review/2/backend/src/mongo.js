import mongoose from 'mongoose';


function connectMongo() {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://erty:<pp>@cluster0.4mvfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
  };

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongo connected!');
    alert('mongo connected');
  });


const mongo = {
  connect: connectMongo,
};

export default mongo;
