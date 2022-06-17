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


//  actual routes


db.sequelize.sync({force:false}).then( () => {
    route.listen(process.env.PORT , () => console.log('Listening at ' + process.env.PORT))
})