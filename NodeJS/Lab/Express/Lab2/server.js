const express = require('express')
const { uniqueId } = require('lodash')
const cors = require('cors')
const port = 5000 || process.env.port
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

let list = []

app.get('/',(req,res) => {
    res.status(200).send(list)
})

app.post('/',(req,res) => {
    const newList = {
        id : uniqueId(),
        task : req.body.task
    }
    list.push(newList)
    res.status(201).send(newList)
})

app.put('/:id',(req,res) => {

    list[+req.params.id-1] = {
        id : req.params.id,
        task : req.body.task
    }
    res.status(200).send( {message : "Update Successfully"})
    
})

app.delete('/:id',(req,res) => {

    list = list.filter(list => list.id !== req.params.id)

    res.status(200).send({message : "Delete Successfully"})
})

app.listen(port, ()=> console.log('listening at '+ port))