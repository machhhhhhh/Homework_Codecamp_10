const express = require('express')
const route = express.Router()
const commentController = require('../controller/Comment')
const authenticate = require('../middleware/passport')

route.get('/', authenticate, commentController.getComment)
route.post('/', authenticate, commentController.addComment)
route.put('/:id', authenticate, commentController.editComment)
route.delete('/:id', authenticate, commentController.deleteComment)

module.exports = route