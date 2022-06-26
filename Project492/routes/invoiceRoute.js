const express = require('express')
const route = express.Router()
const invoiceController = require('../controller/invoiceController')
const authenticate = require('../middleware/passport')
const upload = require('../middleware/upload')

route.get('/', authenticate, invoiceController.getInvoice)
route.get('/:id', authenticate, invoiceController.isPay) // find by order_id
route.get('/shop/:id', authenticate, invoiceController.checkInvoice) // find by order_id shop
route.post('/', authenticate, upload.single("invoiceImg"), invoiceController.createInvoice)
route.put('/:id', authenticate, upload.single('invoiceImg'),invoiceController.payInvoice)
route.post('/list', authenticate, invoiceController.addList)

module.exports = route