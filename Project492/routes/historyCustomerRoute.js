const express = require('express')
const route = express.Router()
const historyCustomerController = require('../controller/historyCustomerController')
const authenticate = require('../middleware/passport')

route.get('/',authenticate, historyCustomerController.getHistory)
route.post('/', historyCustomerController.createHistory)
route.put('/:id', authenticate, historyCustomerController.updateDelete)

module.exports = route