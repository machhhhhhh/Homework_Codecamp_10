const express = require('express')
const route = express.Router()
const PostController = require('../controller/Post')
const passport = require('passport')

const authentication = require('../middleware/passport')
const upload = require('../middleware/upload')

route.get('/', authentication , PostController.getPost)
route.post('/', authentication , upload.single('postImg'), PostController.post)
route.put('/:id', authentication , PostController.updatePost)
route.delete('/:id', authentication , PostController.deletePost)

module.exports = route