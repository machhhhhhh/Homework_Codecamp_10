const express = require('express')
const route = express.Router()
const orderController = require('../controller/orderController')
const authenticate = require('../middleware/passport')
const upload = require('../middleware/upload')

route.get('/',authenticate, orderController.getAllOrder)
// route.get('/customer',authenticate, orderController.getOrderOfCustomer)
// route.get('/:id',authenticate, orderController.getOrderbyId)
route.post('/',authenticate, upload.single('orderImg'),orderController.addOrder)
route.put('/:id', authenticate, orderController.acceptOrder)
route.delete('/:id', authenticate, orderController.cancelOrder)

// route.get('/', authenticate, customerController.getUser)
// // route.get('/:id', authenticate, customerController.getUser)
// route.post('/login', customerController.userLogin)
// route.post('/register', customerController.userRegister)
// route.put('/profile', authenticate, upload.single('customerImg'), customerController.updateProfile)

module.exports = route