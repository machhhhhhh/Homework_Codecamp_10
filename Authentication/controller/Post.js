const db  = require('../models')

const getPost = async (req,res) => {

    // 1 หา post ทั้งหมดของ props.user (req.user)
    // 2 เทียบว่า props.user มี friship user id ไหนบ้าง
    // 3 เช็คว่า  friendship มี post อันไหนบ้าง
    // render ทั้ง user และ friend เทียบ time

    // const user = user.findAll(where : friendship : {friendid : req.user.id})
    // const post = await db.Post.findAll({where : { UserId : user.id}})
    const post = await db.Post.findAll({where : { UserId : req.user.id}})

    res.status(200).send(post)
    
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

module.exports = {
    getPost,
    post
}