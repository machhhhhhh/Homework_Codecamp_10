const express = require('express')
const route = express.Router()
const historyShopController = require('../controller/historyShopController')
const authenticate = require('../middleware/passport')

route.get('/',authenticate, historyShopController.getHistory)
route.get('/:id',authenticate, historyShopController.getOneHistory)
route.post('/', historyShopController.createHistory)
route.put('/:id', authenticate, historyShopController.updateDelete)
route.post('/clear', authenticate, historyShopController.deleteAll)

module.exports = route