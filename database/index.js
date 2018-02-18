const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // not sure why we need this, but added because it was throwing an error in console
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

// think of schema as creating a table in our DB
let repoSchema = mongoose.Schema({
  id: Number,
  full_name: String,
  owner: {
    login: String
  },
  private: Boolean,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  // console.log('this is repos: ', repos);
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if (repos) {
    repos.forEach((repos) => {
      let newRepo = new Repo({
        id: repos.id,
        full_name: repos.full_name,
        owner: repos.owner,
        html_url: repos.html_url
      });
      newRepo.save((err) => {
        if (err) return handleError(err);
      });
    });
  }
}

//create a find func here and invoke in app.get
let search = (callback) => {
  Repo.find({}, (error, collection) => {
    if (error) throw error;
    callback(collection);
  }).limit(25);
  // console.log(logins);
}
module.exports.save = save;
module.exports.search = search;
