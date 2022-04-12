const express = require('express')
const route = express.Router()
const userConTroller = require('../controller/User')

route.get('/', userConTroller.getUser)
route.post('/login', userConTroller.login)
route.post('/register', userConTroller.register)


module.exports = route