const model = require('../models/auth')

function getToken(req, res, next) {
  model.getToken()
  .then ( data => {
    res.send(data)
  })
}

module.exports = { getToken }