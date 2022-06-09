const db  = require('../models')
const fs = require('fs')
const cloundinary = require('cloudinary').v2
const util = require('util')
const uploadPromise = util.promisify(cloundinary.uploader.upload)
const destroyPromise = util.promisify(cloundinary.uploader.destroy)
const getPost = async (req,res,next) => {
    try {
        // 1 หา post ทั้งหมดของ props.user (req.user)
        // 2 เทียบว่า props.user มี friship user id ไหนบ้าง
        // 3 เช็คว่า  friendship มี post อันไหนบ้าง
        // render ทั้ง user และ friend เทียบ time
        // const user = await db.User.findOne({where : { id : req.user.id}}) // หา user
        // const post = await db.Post.findAll({where : {userId : user.id}}) // หา post ของ user ปัจจุบัน
        // const friend = await db.Friend.findAll({where : {UserId : user.id}}) // หา friend ทั้งหมดของ user
        // const Post = await db.findAll({where : {UserId : friend.UserId}}) // หา post ทั้งหมดของ friend ทั้งหมด
        
        const user = await db.User.findOne({where : { id : req.user.id}}) // หา user
        const post = await db.Post.findAll({where : { user_id : user.id}})

        res.status(200).send({post,user})
    } catch (error) {
        next(error)
    }
    
    
}

const post = async ( req,res,next) => {
    
    try {

        if(!req.body.description && !req.file){
            return res.status(404).send({message: 'type some thing or add image'})
        }

            let image = {}
            if(req.file){
                image = await uploadPromise(req.file.path)
                // console.log(req.file);
                fs.unlinkSync(req.file.path)
                // console.log(img);
            }
            
            
            const newPost = await db.Post.create({
            description : req.body.description,
            photo : image.secure_url,
            emotion : req.body.emotion,
            user_id : req.user.id
        })
            
            res.status(201).send(newPost)
        
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req,res,next) => {

    try {
        const post = await db.Post.findOne({
            where : {
                id : req.params.id,
                user_id : req.user.id
            }
        })

        if (!post) {
            return   res.status(404).send({message : 'Post Not Found'})
        }
        let image = {}
            if(req.file){
                image = await uploadPromise(req.file.path)
                // console.log(req.file);
                if(req.user.postImg){
                    const splited = req.user.postImg.split('/')
                    destroyPromise(splited[splited.length -1].split('.')[0],(err, result) => {})
                }
                fs.unlinkSync(req.file.path)
                // console.log(img);
            }
            
        
        await post.update({
            description : req.body.description,
            photo : image.secure_url,
            emotion : req.body.emotion,
        }, {
            where : {
                id : req.params.id,
            }
        })
        res.status(200).send({message : 'Update Successfully'})
    } catch (error) {
        next(error)
    }

}

const deletePost = async (req,res) => {
   try {
        const post = await db.Post.findOne({
            where : {
                id : req.params.id,
                user_id : req.user.id
            }
        })

        if (post) {
            await post.destroy()
            res.status(204).send({message : 'Delete Successfully'})
        } else {
            res.status(404).send({message : "Post Not Found"})
        }               
   } catch (error) {
       next(error)
   }
}

module.exports = {
    getPost,
    post,
    updatePost,
    deletePost
}