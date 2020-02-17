const axios = require("axios");

const moviesInstance = axios.create({
  baseURL: "http://localhost:3001/movies/"
});

module.exports = moviesInstance;
