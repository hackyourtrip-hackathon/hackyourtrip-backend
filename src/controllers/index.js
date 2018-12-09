const model = require('../models')

const read = (req, res, next) => {
  const data = model.get(parseInt(req.params.id))
  if (data) return res.status(200).json(data)
  else return next()
}

const readAll = (req, res, next) => {
  const limit = req.query.limit
  const data = model.getAll(limit)
  if (data) return res.status(200).json(data)
  else return next()
}

const create = (req, res, next) => {
  if (!req.body.name || !req.body.phone || !req.body.city || !req.body.zip_code || !req.body.mcc || !req.body.image || !req.body.cost || !req.body.currency)
    return next({ status: 400, message: `new entries must have all fields` })

  if (req.body.name.length > 30) return next({ status: 400, message: `name exceeded character limit` })

  model.create(req.body)
    .then(data => res.status(201).json(data)).catch(next)
}

const edit = (req, res, next) => {
  if (!req.body)
    return next({ status: 400, message: `edit failed. request is empty` })

  if (req.body.name.length > 30) return next({ status: 400, message: `name exceeded character limit` })

  model.edit(req.params.id, req.body)
    .then(data => res.status(200).json(data)).catch(next)
}

const remove = (req, res, next) => {
  model.remove(req.params.id)
    .then(data => res.status(200).json(data)).catch(next)
}

module.exports = { read, readAll, create, edit, remove }
