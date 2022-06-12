const express = require('express')
const route = express.Router()
const commentLikeController = require('../controller/CommentLike')
const authenticate = require('../middleware/passport')

// route.get('/', authenticate, likeController.likeOrNot)
// route.get('/getlike', authenticate, likeController.getAllLike)
route.get('/:id', authenticate, commentLikeController.getLike)
route.post('/', authenticate, commentLikeController.pressLike)
route.delete('/:id', authenticate, commentLikeController.unLike)

module.exports = route