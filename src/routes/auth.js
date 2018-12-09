const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/auth')

router.get('/', ctrl.getToken)
// router.post('/', ctrl.login)router.get('/login', ctrl.authenticated, ctrl.status)

module.exports = router