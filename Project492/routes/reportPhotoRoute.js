const express = require('express')
const route = express.Router()
const reportPhotoController = require('../controller/reportPhotoController')
const authenticate = require('../middleware/passport')
const upload = require('../middleware/upload')

route.post('/', authenticate,upload.single('reportImg'), reportPhotoController.addPhoto )

// upload.array('reportImg', 12) and input make multiple

module.exports = route