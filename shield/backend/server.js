const express = require('express')
const app = express()
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const shielsync = 'myProject';
const port = 3000
app.use(bodyParser.json());
app.use(cors());

client.connect();

// get pass
app.get('/', async(req, res) => {
     const db = client.db(shielsync);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//save pass
app.post('/', async(req, res) => {
    const password = req.body;
     const db = client.db(shielsync);
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(password);
  res.send({success:true, result:findResult})
})
//delete pass
app.delete('/', async(req, res) => {
    const password = req.body;
     const db = client.db(shielsync);
    const collection = db.collection('documents');
    const findResult = await collection.deleteOne(password);
  res.send({success:true, result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
