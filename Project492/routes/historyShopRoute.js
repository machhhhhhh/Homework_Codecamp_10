const express = require('express')
const route = express.Router()
const historyShopController = require('../controller/historyShopController')
const authenticate = require('../middleware/passport')

route.get('/',authenticate, historyShopController.getHistory)
route.post('/', historyShopController.createHistory)
route.put('/:id', authenticate, historyShopController.updateDelete)

module.exports = route