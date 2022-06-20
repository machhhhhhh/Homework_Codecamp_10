require('dotenv').config()
const express = require('express')
const route = express()
const cors = require('cors')
const db = require('./models')
const session = require('express-session')

route.use(cors())
route.use(express.json())
route.use(express.urlencoded({extended:true}))
require('./config/passport/passport')
route.use('/static', express.static('public/images')) 
route.use(session({
    secret:'cat hahahah',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//  import routes
const customerRoute = require('./routes/customerRoute')
const shopOwnerRoute = require('./routes/shopOwnerRoute')
const orderRoute = require('./routes/orderRoute')
const orderPhotoRoute = require('./routes/orderPhotoRoute')
const historyCustomerRoute = require('./routes/historyCustomerRoute')
const historyShopRoute = require('./routes/historyShopRoute')
const invoiceRoute = require('./routes/invoiceRoute')

//  actual routes
route.use('/customer', customerRoute)
route.use('/shop', shopOwnerRoute)
route.use('/order', orderRoute)
route.use('/order/photo', orderPhotoRoute)
route.use('/history-customer', historyCustomerRoute)
route.use('/history-shop', historyShopRoute)
route.use('/invoice', invoiceRoute)

db.sequelize.sync({force:false}).then( () => {
    route.listen(process.env.PORT , () => console.log('Listening at ' + process.env.PORT))
})