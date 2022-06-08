const {Friend} = require('../models')
const {Op} = require('sequelize')

const addFriend = async (req,res,next) => {
    try {
        const friend = await Friend.findOne({
            where : {
                [Op.or] : [
                    {
                        sender_id : req.user.id,
                        receiver_id : req.body.target_id
                    },
                    {
                        sender_id : req.body.target_id,
                        receiver_id : req.user.id
                    }
                ]
            }
        })

        if (friend){
            return res.status(400).send({message : 'This request has already been requrested'})
        }
        
        await Friend.create({
            sender_id : req.user.id,
            receiver_id : req.body.receiver_id,
            status : 'REQUESTED'
        })

        res.status(201).send({message : 'Create Friend Request'})

    } catch (error) {
        next(error)
    }
}

const accept = async (req,res,next) => {
    try {
        
        const friend = await Friend.findOne({
            where : {
                id : req.params.id ,
                status : "REQUESTED"
            }
        })

        if(!friend) return res.status(404).send({message : 'The Request not found'})

        if(friend.receiver_id !== req.user.id){
            return res.status(403).send({message : 'Cannot Accept The Request'})
        }

        await Friend.update({
            status : "ACCEPTED"
        }, {
            where : {
                id : req.params.id
            }
        })

        res.status(201).send({message : "Accept The Request"})


    } catch (error) {
        next(error)
    }
}


const unFriend = async (req,res,next) =>  {
    try {

        const friend = await Friend.findOne({ 
            where : {
                [Op.or] : [
                    {
                        id : req.params.id,
                        sender_id : req.user.id,
                    },
                    {
                        id : req.params.id,
                        receiver_id : req.user.id
                    }
                ]
            }
        })

        if(!friend) {
            return res.status(404).send({message : 'Not found friend'})
        }

        await Friend.destroy({
            where : {
                id : req.params.id
            }
        })

        res.status(200).send({message : "Delete Friend Successfully"})



    } catch (error) {
        next(error)
    }
}

module.exports = {
    addFriend,
    accept,
    unFriend
}