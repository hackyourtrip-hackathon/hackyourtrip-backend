const { sync } = require('./sync')
const { read, write } = sync('./db/tour_guides.json')

const get = (id) => {
  const errors = []
  const data = read()
  const entry = data.find(e => e.id === id)

  if (!entry) {
    errors.push(`${id} doesn't exist`)
    return { errors }
  }
  return entry
}

const getAll = (limit) => {
  const errors = []
  const data = read()

  if (!data.length) {
    errors.push(`there are no entries :(`)
    return { errors }
  }
  return limit ? data.slice(0, limit) : data
}

const create = ({ name, phone, city, zip_code, mcc, image, cost, currency }) => {
  const errors = []
  const data = read()

  if (!name && !phone && !city && !zip_code && !mcc && !image && !cost && !currency) {
    errors.push(`must use name or content for editing`)
    return { errors }
  }

  let entry = { id: `${shortid.generate()}`, name, phone, city, zip_code, mcc, image, cost, currency }

  data.push(entry)
  write(data)
  return entry
}

const edit = (id, { name, phone, city, zip_code, mcc, image, cost, currency }) => {
  const errors = []
  const data = read()
  const entry = data.find(e => e.id === id)

  if (!name && !phone && !city && !zip_code && !mcc && !image && !cost && !currency) {
    errors.push(`must use name or content for editing`)
    return { errors }
  }

  entry.name = name
  entry.phone = phone
  entry.city = city
  entry.zip_code = zip_code
  entry.mcc = mcc
  entry.image = image
  entry.cost = cost
  entry.currency = currency

  write(data)
  return entry
}

const remove = (id) => {
  const errors = []
  const data = read()
  const entry = data.find(e => e.id === id)
  const index = data.findIndex(i => i.id === id)

  if (!entry) {
    errors.push(`${id} doesn't exist`)
    return { errors }
  }

  data.splice(index, 1)
  write(data)
  return data
}

module.exports = { get, getAll, create, edit, remove }
