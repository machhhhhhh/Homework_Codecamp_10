const express = require('express')
const route = express.Router()
const PostController = require('../controller/Post')
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session:false})

route.get('/', authentication , PostController.getPost)
route.post('/', authentication , PostController.post)
route.put('/:id', authentication , PostController.updatePost)
route.delete('/:id', authentication , PostController.deletePost)

module.exports = route