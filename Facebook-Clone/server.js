require('dotenv').config()
const express = require('express')
const route = express()
const cors = require('cors')
const db = require('./models')


// middle ware
route.use(cors())
route.use(express.json())
route.use(express.urlencoded({extended:true}))
require('./config/passport/passport')


// import routes
const userRoutes = require('./rotues/user')
const postRoutes = require('./rotues/post')
const groupRoutes = require('./rotues/group')


// actual routes
route.use('/user', userRoutes)
route.use('/post', postRoutes)
route.use('/group', groupRoutes)

// database render
db.sequelize.sync().then(()=> {
    route.listen(process.env.port, () => console.log('Listening at ' + process.env.port))
})