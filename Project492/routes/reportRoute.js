const express = require('express')
const route = express.Router()
const authenticate = require('../middleware/passport')
const reportController = require('../controller/reportController')

route.get('/', authenticate, reportController.getReport)
route.get('/:id',authenticate, reportController.isReport)
route.post('/', authenticate, reportController.createReport)


module.exports  = route