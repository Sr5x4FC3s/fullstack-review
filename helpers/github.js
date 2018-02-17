const request = require('request');
const config = require('../config.js');

let getReposByUsername = (gitHandle, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  let options = {
    url: `https://api.github.com/users/${gitHandle}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response) => {
    if (error) {
      console.log('error', error);
    } else {
      //console.log(response.body)
      callback(response.body);
      // console.log('response',response.body);
    }
  })
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  // request(options, callback);
}


module.exports.getReposByUsername = getReposByUsername;
