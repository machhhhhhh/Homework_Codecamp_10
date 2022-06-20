const express = require('express')
const route = express.Router()
const reportPhotoController = require('../controller/reportPhotoController')
const authenticate = require('../middleware/passport')
const upload = require('../middleware/upload')

route.post('/', authenticate,upload.single('reportImg'), reportPhotoController.addPhoto )

module.exports = route