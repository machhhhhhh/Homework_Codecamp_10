const {Post, User, Comment, Friend} = require('../models')
const {Op} = require('sequelize')


const getComment = async(req,res,next) => {
    try {

        const {post_id} = req.body

        const post = await Post.findOne({where : {id : post_id}})
        if(!post) return res.status(404).send({message : "Post not found"})


        const comment = await Comment.findAll({
            where : {PostId : post_id},
            include : [
                {
                    model : User,
                    attributes : {
                        exclude : ['username', 'password']
                    }
                },
                {
                    model : Post,
                }
            ]
        })
        if(!comment) return res.status(200).send({message : "No Comment"})

        

        res.status(200).send(comment)


    } catch (error) {
        next(error)
    }
}

const addComment = async(req,res,next) => {

    try {
        
        const {post_id, description} = req.body

        const post = await Post.findOne({where : { id : post_id}})

        if(!post) return res.status(404).send({message : "post not found"})

        const friend = await Friend.findOne({
            where : {
                status : 'ACCEPTED',
                [Op.or] : [
                    {
                        sender_id : req.user.id,
                        receiver_id : post.UserId
                    }
                    , {
                        sender_id : post.UserId,
                        receiver_id : req.user.id
                    }
                ]
            }
        })

        

        if(!friend && req.user.id !== post.UserId){
            return res.status(403).send({message : 'Cannot comment this post'})
        }


        const comment =  await Comment.create({
            description : description,
            UserId : req.user.id,
            PostId : post_id
        })

        res.status(201).send(comment)

    } catch (error) {
        next(error)
    }

}


const editComment = async (req,res,next) => {
    try {

        
        const comment = await Comment.findOne({where : {id : req.params.id}})
        if(!comment) return res.status(404).send({message : 'Comment not found'})

        
        if ( req.user.id !== comment.UserId){
            return res.status(403).send({message : 'Cannot Edit Comment'})
        }

        await Comment.update({
            description : req.body.description
        },{
            where : {
                id : req.params.id
            }
        })

        res.status(200).send({message : "Update comment complete"})



    } catch (error) {
        next(error)
    }
}


const deleteComment = async (req,res,next) => {
    try {

        const {post_id} = req.body

        const post = await Post.findOne({where : { id  : post_id}})
        if(!post) return res.status(404).send({message : 'Post not found'})
        const comment = await Comment.findOne({where : {id : req.params.id}})
        
        if(!comment) return res.status(404).send({message : 'Comment not found'})

        
        if (req.user.id !== comment.UserId && post.UserId !== req.user.id){

            return res.status(403).send({message : 'Cannot Delete this comment'})
        }

        await comment.destroy()

        res.status(204).send({message : 'Delete Complete'})



    } catch (error) {
        next(error)
    }
}


module.exports = {
    addComment,
    getComment,
    editComment,
    deleteComment
}