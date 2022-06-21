const express = require('express')
const route = express.Router()
const userController = require('../controller/userController')
const authenticate = require('../middleware/passport')

route.get('/',authenticate, userController.getUser)
route.post('/', userController.userLogin)

module.exports = route