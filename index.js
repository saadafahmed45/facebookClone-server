const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const cors = require ('cors');
const bodyParser = require('body-parser');
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())
const port = 7000;

// const user = facebookClone;
// const pass = facebookClone45;
// const database = facebookDB;

// mongoDB connection



const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.PASS}@cluster0.vvccs.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const loginCollection = client.db("facebookDB").collection("loginItems");
  // perform actions on the collection object
  console.log('database is connect');
  


//   / set data from database in server

  app.get('/loginItem',(req, res) => {
    loginCollection.find()
   .toArray((err,items) =>{
     res.send(items)
   })
 })

   // post data set to the mongodb database
   app.post('/login',(req, res) => {
    const newItems = req.body;
    console.log('adding new event: ', newItems);
    loginCollection.insertOne(newItems)
    .then(result => {
    //   console.log('inserted Count', result.insertedCount);
      res.send(result.insertedCount > 0);
    })
  })


  //  delete

app.delete("/delete/:id" , (req, res) =>{
    const id = req.params.id;
    // console.log(req.params.id); 
    loginCollection.deleteOne({_id : ObjectId(id)})
    .then(documents => res.send("send"))
  })

});




app.get('/', (req, res) => {
  res.send('Facebook Clone server is ready')
})

app.listen(port)