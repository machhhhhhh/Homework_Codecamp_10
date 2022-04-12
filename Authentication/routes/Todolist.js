const express = require('express')
const route = express.Router()
const TodolistController = require('../controller/Todolist')
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session:false})

route.get('/', authentication , TodolistController.getAllList)
route.post('/', authentication , TodolistController.postList)
route.put('/:id', authentication , TodolistController.updateList)
route.delete('/:id', authentication , TodolistController.deleteList)

module.exports = route