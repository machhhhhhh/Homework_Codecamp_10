const {PostLike,Post,User} = require('../models')

const getLike = async(req,res,next)=> {

    try {


        const like = await PostLike.findOne({
            where : 
            {
                PostId : req.params.id,
                UserId : req.user.id
            },
            // include : [
            //     {
            //         model : User,
            //         attributes : {
            //             exclude : ['username', 'password', 'phone']
            //         }
            //     }
            // ]
        })

        if(!like) return res.status(404).send(false)
        

        res.status(200).send(true)


    } catch (error) {
        next(error)
    }

}

const likeOrNot = async(req,res,next) => {
    try {

        let icon = false
        // const {post_id} = req.body

        // const post = await Post.findOne({where : {id : post_id}})
        // if(!post) return res.status(404).send({message:'Post not found'})

        const like = await PostLike.findOne({
            where : 
            { 
                PostId : req.params.id,
                UserId : req.user.id
            }
        })


        if(like){
           icon = true 
        }

        res.status(200).send(icon)
        


    } catch (error) {
        next(error)
    }
}

const pressLike = async (req,res,next) => {
    try {

        const {post_id} = req.body

        const post = await Post.findOne({where : {id : post_id}})
        if(!post) return res.status(404).send({message : "Post not found"})


        const like = await PostLike.findOne({
            where : 
            {
                PostId : post.id,
                UserId : req.user.id
            }
        })

        

        if(like) return res.status(400).send({message : 'Like Already'})

        const postlike = await PostLike.create({
            PostId : post_id,
            UserId : req.user.id
        })

        res.status(201).send(postlike)

        
    } catch (error) {
        next(error)
    }
}

const unLike = async(req,res,next) => {
    try {


        // const like = await PostLike.findOne({
        //     where : 
        //     {
        //         PostId : post.id,
        //         UserId : req.user.id
        //     }
        // }
        // )
        const like = await PostLike.findOne( {where : {PostId : req.params.id}})

        if(!like) return res.status(404).send({message :'Like not Found'})

        if(like.UserId !== req.user.id){
            return res.status(400).send({message : 'Cannot Unlike'})
        }

        await like.destroy()
        res.status(204).send({message : 'Unlike Complete'})
        
    } catch (error) {
        next(error)
    }
}


module.exports ={
    pressLike,
    unLike,
    likeOrNot,
    getLike
}