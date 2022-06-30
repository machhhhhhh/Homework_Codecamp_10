const express = require('express')
const route = express.Router()
const userController = require('../controller/userController')
const authenticate = require('../middleware/passport')

route.get('/',authenticate, userController.getUser)
// route.get('/check',authenticate, userController.checkFinish)
route.post('/', userController.userLogin)
route.put('/order/:id', authenticate, userController.choose)

module.exports = route