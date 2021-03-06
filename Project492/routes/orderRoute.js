const express = require('express')
const route = express.Router()
const orderController = require('../controller/orderController')
const authenticate = require('../middleware/passport')

route.get('/',authenticate, orderController.getAllOrder)
route.get('/check', authenticate, orderController.checkFinish)
route.get('/customer',authenticate, orderController.getOrderOfCustomer)
route.get('/:id', authenticate, orderController.getOneOrder)
route.post('/',authenticate,orderController.addOrder)
route.put('/:id', authenticate, orderController.acceptOrder)
route.put('/choose/:id', authenticate, orderController.choose)
route.put('/finish/:id', authenticate, orderController.finishOrder)
route.delete('/:id', authenticate, orderController.cancelOrder)

// route.get('/customer',authenticate, orderController.getOrderOfCustomer)
// route.get('/', authenticate, customerController.getUser)
// // route.get('/:id', authenticate, customerController.getUser)
// route.post('/login', customerController.userLogin)
// route.post('/register', customerController.userRegister)
// route.put('/profile', authenticate, upload.single('customerImg'), customerController.updateProfile)

module.exports = route