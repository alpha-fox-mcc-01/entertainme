const axios = require("axios");

const tvInstance = axios.create({
  url: "http://localhost:3002/tv"
});

module.exports = tvInstance;
