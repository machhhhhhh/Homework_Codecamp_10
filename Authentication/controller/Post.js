const db  = require('../models')

const getPost = async (req,res) => {

    // 1 หา post ทั้งหมดของ props.user (req.user)
    // 2 เทียบว่า props.user มี friship user id ไหนบ้าง
    // 3 เช็คว่า  friendship มี post อันไหนบ้าง
    // render ทั้ง user และ friend เทียบ time
    // const user = await db.User.findOne({where : { id : req.user.id}}) // หา user
    // const post = await db.Post.findAll({where : {userId : user.id}}) // หา post ของ user ปัจจุบัน
    // const friend = await db.Friend.findAll({where : {UserId : user.id}}) // หา friend ทั้งหมดของ user
    // const Post = await db.findAll({where : {UserId : friend.UserId}}) // หา post ทั้งหมดของ friend ทั้งหมด
    
    const user = await db.User.findOne({where : { id : req.user.id}}) // หา user
    const post = await db.Post.findAll({where : { UserId : user.id}})

    res.status(200).send({post,user})
    
}

const post = async ( req,res) => {
    
    const newPost = await db.Post.create({
        description : req.body.description,
        photo : req.body.photo,
        emotion : req.body.emotion,
        UserId : req.user.id
    })
    
    res.status(201).send(newPost)
}

const updatePost = async (req,res) => {

    const post = await db.Post.findOne({
        where : {
            id : req.params.id,
            UserId : req.user.id
        }
    })

    if (post) {
        await post.update({
            description : req.body.description,
            photo : req.body.photo,
            emotion : req.body.emotion,
        })
        res.status(200).send({message : 'Update Successfully'})
    } else {
        res.status(404).send({message : 'Post Not Found'})
    }

}

const deletePost = async (req,res) => {
    const post = await db.Post.findOne({
        where : {
            id : req.params.id,
            UserId : req.user.id
        }
    })

    if (post) {
        await post.destroy()
        res.status(200).send({message : 'Delete Successfully'})
    } else {
        res.status(404).send({message : "Post Not Found"})
    }
}

module.exports = {
    getPost,
    post,
    updatePost,
    deletePost
}