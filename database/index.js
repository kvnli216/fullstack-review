const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1128');

let repoSchema = mongoose.Schema({
  repo: {
    id: Number,
    repoName: String,
    description: String,
    forks_count: String,
    html_url: String
  } // todo: unique entry
});

let Repo = mongoose.model('Repo', repoSchema);



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('SUCCESS: Connected to mongodb');
});

let save = (repo) => {
  debugger;
  let newRepo = new Repo({
    repo: {
      id: repo.id,
      repoName: repo.name,
      forks_count: repo.forks_count,
      html_url: repo.html_url
    } 
  })

  newRepo.save((err) => {
    if (err) {
      console.log('ERR on save');
    } else {
      console.log('SUCCESS on save');
    }
  });
};



module.exports.save = save;

// var small = new Tank({ size: 'small' });
// small.save(function (err) {conn
//   if (err)   handleError(err);
//   // saved!
// });

// // or

// Tank.create({ size: 'small' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });