const express = require('express')
const route = express.Router()
const shopOwnerController = require('../controller/shopOwnerController')
const authenticate = require('../middleware/passport')
const upload = require('../middleware/upload')

// route.get('/', authenticate, shopOwnerController.getUser)
// route.post('/login', shopOwnerController.shopLogin)
route.post('/register', shopOwnerController.shopRegister)
route.put('/profile', authenticate, upload.single('shopImg'),shopOwnerController.updateProfile)

route.put('/on', authenticate, shopOwnerController.turnOn)
route.put('/off', authenticate, shopOwnerController.turnOff)

module.exports = route