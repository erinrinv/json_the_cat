// request module to make HTTP requests in Node.js
const request = require("request");

const fs = require("fs");
// gets breed based on command line argument when running
const host = `https://api.thecatapi.com/v1/breeds/search?q=${process.argv[2]}`;

//reads the body of the response asynchronously
const breedFetcher = function (callback) {
  request(host, (error, response, body) => {
    if (error) console.log(error);
    fs.readFile(body, "utf8", (error, data) => {
      callback(body);
    });
  });
};

// reads the JSON data and checks if the response contains any data
// if no data is found then says "cat can not be found"
// if found then logs the description of the cat
const apiCallback = function (body) {
  const data = JSON.parse(body);
  if (data.length === 0) {
    console.log("cat not found!!");
  } else {
    console.log(data[0]["description"]);
  }
};

// calls the function and begins the process
breedFetcher(apiCallback);
