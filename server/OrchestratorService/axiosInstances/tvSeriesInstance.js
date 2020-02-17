const axios = require("axios");

const tvInstance = axios.create({
  baseURL: "http://localhost:3002/tv/"
});

module.exports = tvInstance;
