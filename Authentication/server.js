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
route.use('/static', express.static('public/images')) // localhost:5000/static/fileImg
route.use(session({
    secret:'cat hahahah',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

// import routes
// const Todolist = require('./routes/Todolist')
const User = require('./routes/User')
const Post = require('./routes/Post')
const Friend = require('./routes/Friend')
const Comment = require('./routes/Comment')

// actual routes
// route.use('/list', Todolist)
route.use('/user', User)
route.use('/post', Post)
route.use('/friend', Friend)
route.use('/comment', Comment)

route.use((req,res) => {
  res.status(400).send({message : 'resource not found in this server'})
})

route.use((err,req,res,next)=> {
  console.log(err);
  res.status(500).send({message : err.message})
})

db.sequelize.sync({force:false}).then(()=> {
    route.listen(process.env.port, () => console.log('Listening at ' + process.env.port))
})