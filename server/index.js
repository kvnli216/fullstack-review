const express = require('express');
const github = require('../helpers/github');
const bodyParser = require('body-parser');
const db = require('../database/index');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded());


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let searchTerm = req.body.username;
  github.getReposByUsername(searchTerm, (err, res) => {
    let repos = JSON.parse(res.body);
    debugger;
    repos.forEach(repo => {
      db.save(repo);
    })
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

