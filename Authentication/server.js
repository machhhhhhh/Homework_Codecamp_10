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
// const Todolist = require('./routes/Todolist')
const User = require('./routes/User')
const Post = require('./routes/Post')

// actual routes
// route.use('/list', Todolist)
route.use('/user', User)
route.use('/post', Post)

db.sequelize.sync().then(()=> {
    route.listen(process.env.port, () => console.log('Listening at ' + process.env.port))
})