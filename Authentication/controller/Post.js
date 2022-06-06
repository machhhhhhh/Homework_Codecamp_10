const express = require('express')
const route = express.Router()
const PostController = require('../controller/Post.js')
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session:false})

// route.get('/', authentication , PostController.getAllList)
route.post('/', authentication , PostController.post)
// route.put('/:id', authentication , TodolistController.updateList)
// route.delete('/:id', authentication , TodolistController.deleteList)

module.exports = route