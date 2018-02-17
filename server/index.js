const express = require('express');
const parser = require('body-parser');
const helper = require('../helpers/github.js');
const save = require('../database/index.js');
// const MongoClient = require('mongodb').MongoClient;
//
// MongoClient.connect('mongodb://localhost:1128', (err, db) => {
//   if (err) throw err;
//   db.collection('repos')find().toArray((err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
// })

let app = express();

app.use(parser.text());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let data = req.body;
  console.log('this is data11111111', data);
  helper.getReposByUsername(data, (item) => {
    let parsedItem = JSON.parse(item);
    let itemLength = parsedItem.length;
    console.log('this is an object', parsedItem[0].owner.login);

  });
  res.status(200).send(data);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  let data = req;
  console.log(req);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
