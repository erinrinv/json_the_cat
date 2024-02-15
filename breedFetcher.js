// request module to make HTTP requests in Node.js
const request = require("request");

const fs = require("fs");


//reads the body of the response asynchronously
// Take name of the cat and then once its found bring description back
const fetchBreedDescription = function(breedName, callback) {
  // Checks API
  const host = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  // Aysnc function checks JSON file based on pull from API
  // If not found will return message
  // otherwise returns first matching of breed of cat
  const async = function(body) {
    const content = JSON.parse(body);
    if (content.length === 0) {
      return 'cat not found!!';
    } else {
      return content[0]['description'];
    }
  };
  // Checks for errors
  // If there are errors calls with error
  //fetch the description of a given cat breed from the Cat API and invoke a callback function with the result.
  request(host, (error, response, body) => {
    if (error) callback(error, null);
    fs.readFile(body, 'utf8', () => {
      const desc = async(body);
      callback(null, desc);
    });
  });
};



// export
module.exports = { fetchBreedDescription };
