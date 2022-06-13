const express = require('express')
const route = express.Router()
const userConTroller = require('../controller/User')
const authenticate = require('../middleware/passport')
const upload = require('../middleware/upload')

route.get('/',authenticate, userConTroller.getUser)
route.get('/:id',authenticate, userConTroller.findUser)
route.post('/login', userConTroller.login)
route.post('/register', userConTroller.register)
route.put('/profile', authenticate, upload.single('profileImg') , userConTroller.updateProfile)

// route.get('/logout', userConTroller.logout)

module.exports = route