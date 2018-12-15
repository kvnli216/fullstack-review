const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1128');

let repoSchema = mongoose.Schema({
  id: Number,
  repoName: String,
  description: String,
  forks_count: Number,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('SUCCESS: Connected to mongodb');
});

let save = (repo) => {
  let newRepo = new Repo({
    id: repo.id,
    repoName: repo.name,
    forks_count: repo.forks_count,
    html_url: repo.html_url
  })
  // debugger;
  newRepo.save()
  .then(() => {
    if (newRepo.isNew === false) {
      console.log('SUCCESS: saved to db');
      // res.send();
    };
  })
  .catch(err => {
    console.log('FAIL: err saving', err);
  });
};



module.exports = {
  save: save,
  Repo: Repo
}