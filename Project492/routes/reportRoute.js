const express = require('express')
const route = express.Router()
const authenticate = require('../middleware/passport')
const reportController = require('../controller/reportController')

route.get('/', authenticate, reportController.getReport)
route.get('/:id',authenticate, reportController.isReport) // order_id
route.post('/', reportController.createReport)
route.put('/:id',authenticate, reportController.pressReport)


module.exports  = route