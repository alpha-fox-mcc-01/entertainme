module.exports = function(err, req, res, next) {
  const stringifiedErr = JSON.stringify(err)

  if (err.code === 404) {
    res.status(err.code).json({
      message: `${err.resource} not found`,
    })
  } else if (stringifiedErr.indexOf('ValidatorError') !== -1) {
    const mongooseErrors = err.errors
    const response = []

    for (let key in mongooseErrors) {
      response.push(mongooseErrors[key].message)
    }
    res.status(400).json({ errors })
  } else if (stringifiedErr.indexOf('CastError')) {
    console.log('-------------------------sini')
    res.status(400).json({ message: 'bad / invalid ID' })
  } else {
    console.log(err)

    res.status(500).json({
      message: 'Internal server error',
    })
  }
}
