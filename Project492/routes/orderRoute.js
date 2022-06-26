const express = require('express')
const route = express.Router()
const orderController = require('../controller/orderController')
const authenticate = require('../middleware/passport')

route.get('/',authenticate, orderController.getAllOrder)
route.get('/customer',authenticate, orderController.getOrderOfCustomer)
route.post('/',authenticate,orderController.addOrder)
route.put('/:id', authenticate, orderController.acceptOrder)
route.delete('/:id', authenticate, orderController.cancelOrder)

// route.get('/customer',authenticate, orderController.getOrderOfCustomer)
// route.get('/', authenticate, customerController.getUser)
// // route.get('/:id', authenticate, customerController.getUser)
// route.post('/login', customerController.userLogin)
// route.post('/register', customerController.userRegister)
// route.put('/profile', authenticate, upload.single('customerImg'), customerController.updateProfile)

module.exports = route