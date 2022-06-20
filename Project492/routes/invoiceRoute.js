const express = require('express')
const route = express.Router()
const invoiceController = require('../controller/invoiceController')
const authenticate = require('../middleware/passport')

route.get('/', authenticate, invoiceController.getInvoice)
route.post('/', authenticate, invoiceController.createInvoice)
route.put('/:id', authenticate, invoiceController.payInvoice)

module.exports = route