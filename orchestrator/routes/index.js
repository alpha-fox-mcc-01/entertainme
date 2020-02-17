const Redis = require('ioredis')
const redis = new Redis()

const Router = require('express').Router()
const movieService = require('../api/movieService')
const tvService = require('../api/tvService')

const tvServiceController = require('../controllers/tvController')

Router.get('/entertainme', async (req, res) => {
  let entertainmeResponse

  entertainmeResponse = await redis.get('entertainmeCache')

  if (entertainmeResponse) {
    res.status(200).json(JSON.parse(entertainmeResponse))
  } else {
    Promise.all([
      movieService({
        method: 'get',
        url: '/movies',
      }),
      tvService({
        method: 'get',
        url: '/tv',
      }),
    ])
      .then(async (result) => {
        try {
          const movies = result[0].data
          const tvSeries = result[1].data

          entertainmeResponse = {
            movies,
            tvSeries,
          }
          res.status(200).json(entertainmeResponse)
          await redis.set(entertainmeResponse, JSON.stringify(entertainmeResponse), 60)
        } catch (error) {
          console.log(error)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

Router.post('/tv', tvServiceController.delete)
module.exports = Router
