const express = require('express');
const parser = require('body-parser');
const helper = require('../helpers/github.js');
const repo = require('../database/index.js');

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
    let parsedItem = JSON.parse(item); //an array of objects
    let itemLength = parsedItem.length;
    // console.log('this is an object', parsedItem[0].owner.login);
    // invoke the database func to save new instances to the DB

    repo.save(parsedItem);
  });
  res.status(200).send(data);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  let listOfUsers = [];
  repo.search((collection, error) => {
    if (error) throw error;
    res.send(collection)
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
