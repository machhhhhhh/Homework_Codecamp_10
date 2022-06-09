const express = require('express')
const route = express.Router()
const FriendController = require('../controller/Friend')
const authenticate = require('../middleware/passport')

route.get('/', authenticate, FriendController.getAllFriends)
route.post('/', authenticate, FriendController.addFriend)
route.put('/:id', authenticate, FriendController.accept),
route.delete('/:id',authenticate, FriendController.unFriend)

module.exports = route