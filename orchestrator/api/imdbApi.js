const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/',
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
    'x-rapidapi-key': 'b25bad2616msh83fa370b5892ffep169f20jsne05b6fb262a7',
  },
})
