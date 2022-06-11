const  {Post,sequelize, User,PostLike,Comment, Friend, CommentLike}  = require('../models')
const fs = require('fs')
const cloundinary = require('cloudinary').v2
const util = require('util')
const {Op} = require('sequelize')

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

        const friend = await Friend.findAll({ // หาเพื่อน
            where : {
                status : 'ACCEPTED',
                [Op.or] : [{sender_id : req.user.id}, {receiver_id : req.user.id}]
            }
        })

        const user_id = friend.reduce((acc, item) => {  // add user ทั้งหมด รวมถึง req.user ลงไปในตัวแปร
            if(req.user.id === item.sender_id){
                acc.push(item.receiver_id)
            } else {
                acc.push(item.sender_id)
            }
            return acc
        },[req.user.id])
        
        const post = await Post.findAll({ // หา post ทั้งหมดที่มี่ user ทั้งหมด post ว้
            where : { UserId : user_id},
            include : [
                {
                    model : User,
                    attributes : {
                        exclude : ['username', 'password', 'phone']
                    },
                    
                },
                {
                    model : Comment,
                    include : [
                        {
                            model : User,
                            attributes : {
                                exclude : ['username', 'password', 'phone']
                            }
                        },
                        {
                            model : CommentLike,
                                include : [
                                    {
                                        model : User,
                                        attributes : {
                                            exclude : ['username', 'password', 'phone']
                                        }
                                      }
                                    ]
                        }
                    ]
                },
                {
                    model : PostLike,
                    include : [
                        {
                            model : User,
                            attributes : {
                                exclude : ['username', 'password', 'phone']
                            }
                        }
                    ]
                }
            ]
        })
        // const user = await User.findAll({where : {id : user_id}}) // หา user ทั้งหมด

        res.status(200).send(post)
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
            
            
            const newPost = await Post.create({
                description : req.body.description,
                photo : image.secure_url,
                emotion : req.body.emotion,
                UserId : req.user.id
            })
            
            res.status(201).send(newPost)
        
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req,res,next) => {

    try {
        const post = await Post.findOne({
            where : {
                id : req.params.id,
            }
        })

        if (!post) {
            return   res.status(404).send({message : 'Post Not Found'})
        }

        if(post.UserId !== req.user.id) return res.status(400).send({message : "Cannot Edit this post"})

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

const deletePost = async (req,res,next) => {
    const transaction = await sequelize.transaction()

   try {
        const post = await Post.findOne({
            where : {
                id : req.params.id,
            }
        })

        if(!post) return res.status(404).send({message : "Post Not Found"})

        if(post.UserId !== req.user.id) return res.status(400).send({message : 'Cannot Delete this Post'})

        await Comment.destroy({where : {PostId : post.id}}, {transaction})
        await PostLike.destroy({where : {PostId : post.id}}, {transaction})

        await post.destroy()
        await transaction.commit()
        res.status(204).send({message : 'Delete Successfully'})

   } catch (error) {
       await transaction.rollback()
       next(error)
   }
}

module.exports = {
    getPost,
    post,
    updatePost,
    deletePost
}