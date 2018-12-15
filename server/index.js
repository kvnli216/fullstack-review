const express = require('express');
const github = require('../helpers/github');
const bodyParser = require('body-parser');
const db = require('../database/index');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded());


app.post('/repos', function (req, response) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let searchTerm = req.body.username;
  github.getReposByUsername(searchTerm, (err, res) => {
    if (err) {
      console.log('GITHUB ERR', err);
      response.send();
    } else {
      let repos = JSON.parse(res.body);
      repos.forEach(repo => {
        db.save(repo);
      })
      response.send();
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // let query = db.find();
  // debugger;
  db.Repo.find({})
  .then(repos => {
    res.send(repos);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

