const axios = require("axios");

const moviesInstance = axios.create({
  url: "http://localhost:3001/movies"
});

module.exports = moviesInstance;
