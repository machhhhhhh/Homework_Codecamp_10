require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get('/',async (req,res) => {

    const list = await db.Todolist.findAll()
    res.status(200).send(list)
})

app.post('/', async (req,res) => {

    const newList = await db.Todolist.create({
        task : req.body.task
    })

    res.status(201).send(newList)
})

app.put('/:id',async(req,res) => {

    await db.Todolist.update({
        task : req.body.task
    }, {
        where : { id : req.params.id}
    })

    res.status(200).send( {message : "Update Successfully"})
    
})

app.delete('/:id', async(req,res) => {

    await db.Todolist.destroy({
        where : {id : req.params.id}
    })

    res.status(200).send({message : "Delete Successfully"})
})

db.sequelize.sync().then( () => {
    app.listen(process.env.PORT, ()=> console.log('listening at '+ process.env.PORT))
})