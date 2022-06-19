const express = require('express')
const route = express.Router()
const orderPhotoController = require('../controller/orderPhotoController')
const authenticate = require('../middleware/passport')
const upload = require('../middleware/upload')

// route.get('/', authenticate ,orderPhotoController.getPhoto)
route.post('/', authenticate,  upload.single('orderImg'), orderPhotoController.createPhoto)

module.exports = route