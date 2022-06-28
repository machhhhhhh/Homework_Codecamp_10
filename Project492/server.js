require('dotenv').config()
const express = require('express')
const http = require('http')
const route = express()
const cors = require('cors')
const db = require('./models')
const session = require('express-session')
const {Server} = require('socket.io')


// Middle ware
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
const userRoute = require('./routes/userRoute')
const customerRoute = require('./routes/customerRoute')
const shopOwnerRoute = require('./routes/shopOwnerRoute')
const orderRoute = require('./routes/orderRoute')
const orderPhotoRoute = require('./routes/orderPhotoRoute')
const historyCustomerRoute = require('./routes/historyCustomerRoute')
const historyShopRoute = require('./routes/historyShopRoute')
const invoiceRoute = require('./routes/invoiceRoute')
const reportRoute = require('./routes/reportRoute')
const reportPhotoRoute = require('./routes/reportPhotoRoute')

//  actual routes
route.use('/user', userRoute)
route.use('/customer', customerRoute)
route.use('/shop', shopOwnerRoute)
route.use('/order', orderRoute)
route.use('/order/photo', orderPhotoRoute)
route.use('/history-customer', historyCustomerRoute)
route.use('/history-shop', historyShopRoute)
route.use('/invoice', invoiceRoute)
route.use('/report', reportRoute)
route.use('/report/photo', reportPhotoRoute)


/// socket io

const server = http.createServer(route)
const io = new Server(server, {
  cors : {
    origin : "http://localhost:3000",
    methods : ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

io.on('connection', (socket) => {
  // console.log('User + ' + socket.id);

  socket.on('send-order', data => {

    // console.log(data);
    socket.broadcast.emit('get-order', data)

  })

  socket.on('accept-order', data => {
    // console.log(data);

    if(data.accept) socket.broadcast.emit('customer-decide', data)
    // if(data) 
    // socket.broadcast.emit('customer-decide', {order : data})
  })

  socket.on('customer-select', data => {
      // console.log(data);
      socket.broadcast.emit('show-order', data)
  })


})


db.sequelize.sync({force:false}).then( () => {
    server.listen(process.env.PORT , () => console.log('Listening at ' + process.env.PORT))
})