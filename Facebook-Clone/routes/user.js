const express = require('express')
const route = express.Router()
const userController = require('../Controller/user')

// route.get('/', userController.getUser )
route.post('/login', userController.login )
route.post('/register', userController.register )



module.exports = route