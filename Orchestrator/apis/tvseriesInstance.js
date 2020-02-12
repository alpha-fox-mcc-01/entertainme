const axios = require('axios')

const tvseriesInstance = axios.create({
    baseURL: 'http://localhost:3002'
})

module.exports = tvseriesInstance