const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

// think of schema as creating a table in our DB
let repoSchema = mongoose.Schema({
  id: Number,
  full_name: String,
  owner: Object,
  private: Boolean,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var storage = [];
  repos.forEach((repo) => {
    let newRepo = new Repo({
      id: repo.id,
      full_name: repo.full_name,
      owner: repo.owner,
      html_url: repo.html_url
    });
    storage.push(newRepo);
  });
  // let newRepo = new Repo({
  //   id: repos.id,
  //   full_name: repos.full_name,
  //   owner: repos.owner,
  //   html_url: repos.html_url
  // });
  newRepo.save((err) => {
    if (err) return handleError(err);
  })
}

module.exports.save = save;
