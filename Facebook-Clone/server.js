require('dotenv').config()
const express = require('express')
const route = express()
const cors = require('cors')
const db = require('./models')

route.use(cors())
route.use(express.json())
route.use(express.urlencoded({extended:true}))
require('./config/passport/passport')

// import routes
const userRoute = require('./routes/user')

// actual routes
route.use('/user', userRoute)


db.sequelize.sync().then(()=> {
    route.listen(process.env.PORT, () => console.log('Listening at ' + process.env.PORT))
})