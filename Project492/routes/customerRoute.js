const express = require('express')
const route = express.Router()
const customerController = require('../controller/customerController')
const authenticate = require('../middleware/passport')
const upload = require('../middleware/upload')

route.get('/', authenticate, customerController.getUser)
// route.get('/:id', authenticate, customerController.getUser)
// route.post('/login', customerController.userLogin)
route.post('/register', customerController.userRegister)
route.put('/profile', authenticate, upload.single('customerImg'), customerController.updateProfile)

module.exports = route