const db = require('../models')

// const getAllList = async( req, res) => {
//     const allList = await db.Todolist.findAll()
    
//     res.status(200).send(allList)
// }

const getAllList = async (req,res) => {
    const list = await db.Todolist.findAll({where : { UserId : req.user.id}})
    res.status(200).send(list)
}

const postList = async(req,res) => {
    const newList = await db.Todolist.create({
        task : req.body.task,
        UserId : req.user.id
    })

    res.status(201).send(newList)
}

const updateList = async (req,res) => {

    const list = await db.Todolist.findOne({
        where : {
            id : req.params.id,
            UserId : req.user.id
        }
    })

    if (list) {
        await list.update({
            task : req.body.task
        })
        res.status(200).send({message : 'Update Successfully'})
    }
    else {
        res.status(404).send({message: 'Todolist Not Found'})
    }

}

const deleteList = async( req, res) => {
    const list = await db.Todolist.findOne({where : {
        id : req.params.id,
        UserId : req.user.id
    }})

    if (list) {
       await list.destroy()
       res.status(204).send({message : 'Delete Successfully'})
    }

    else {
        res.status(404).send({message : 'Todolist Not found'})
    }

}

module.exports = {
    getAllList,
    postList,
    updateList,
    deleteList
}