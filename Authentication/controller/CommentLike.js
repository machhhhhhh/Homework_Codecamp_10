const {CommentLike, Comment} = require('../models')

const getLike = async(req,res,next) => {

    try {
        
        const like = await CommentLike.findOne({
            where : {
                CommentId : req.params.id,
                UserId : req.user.id
            }
        })

        if(!like) return res.status(200).send(false)
        
        res.status(200).send(true)

    } catch (error) {
        next(error)
    }

}


const pressLike = async (req,res,next) => {
    try {

        const {comment_id} = req.body

        const comment = await Comment.findOne({where : {id : comment_id}})
        if(!comment) return res.status(404).send({message : 'Comment not found'})

        const commentLike = await CommentLike.findOne({where : { CommentId : comment.id, UserId : req.user.id}})
        if(commentLike) return res.status(400).send({message : 'Like this comment already'})

        const like = await CommentLike.create({
            CommentId : comment.id,
            UserId : req.user.id
        })

        res.status(200).send(like)


    } catch (error) {
        next(error)
    }
}

const unLike = async (req,res,next) => {
    try {
        
        const commentLike = await CommentLike.findOne({where : {CommentId : req.params.id}})

        if(!commentLike) return res.status(404).send({message : "Like not found"})
        
        if (req.user.id !== commentLike.UserId){
            return res.status(400).send({message : 'Cannot Unlike'})
        }

        await commentLike.destroy()
        res.status(204).send({message : 'Unlike Complete'})

        // const like = await PostLike.findOne( {where : {id : req.params.id}})

        // if(!like) return res.status(404).send({message :'Like not Found'})

        // if(like.UserId !== req.user.id){
        //     return res.status(400).send({message : 'Cannot Unlike'})
        // }

        // await like.destroy()
        // res.status(204).send({message : 'Unlike Complete'})

    } catch (error) {
        next(error)
    }
}

module.exports = {
    pressLike,
    unLike,
    getLike
}