const {Friend, User} = require('../models')
const {Op} = require('sequelize')


const getUnKnown = async(req,res,next) => {
    try {
        const friend = await Friend.findAll({
            where : {
                [Op.or] : [{sender_id : req.user.id}, {receiver_id : req.user.id}]
            }
        })
        // console.log(friend);

        const friend_id = friend.reduce((acc, item) => {
            if(req.user.id === item.sender_id){
                acc.push(item.receiver_id)
            } else {
                acc.push(item.sender_id)
            }
            return acc
        },[req.user.id])

        const user = await User.findAll({
            where : {
                id : {
                    [Op.notIn] : friend_id
                }
            }
        })

        res.status(200).send(user)

    } catch (error) {
        next(error)
    }
}

const getAllFriends = async (req,res,next) => {
    try {

        const {status, searchName} = req.query
        let where = {}
        
        if(status==="ACCEPTED"){
            where = {
                status,
                [Op.or] : [{sender_id : req.user.id}, {receiver_id : req.user.id}]
            }
        }
        else if (status ==="REQUESTED"){
            where = {
                status,
                receiver_id : req.user.id
            }
        }
        if (!status) {
            where = {
                status : 'REQUESTED',
                sender_id : req.user.id
            }
        }

        const friend = await Friend.findAll({where})

        const friend_id = friend.reduce((acc, item) => {
            if(req.user.id === item.sender_id){
                acc.push(item.receiver_id)
            } else {
                acc.push(item.sender_id)
            }
            return acc
        },[])

        // let userWhere = {}
        // if (searchName){
        //     userWhere = {
        //         [Op.or] : [
        //             {
        //                 fristname : {
        //                     [Op.substring] : searchName
        //                 },
        //                 lastname : {
        //                     [Op.substring] : searchName
        //                 }
        //             }
        //         ]
        //     }
        // }

        const user = await User.findAll({
            where : {
                id : friend_id,
                // ...userWhere
            },
            attributes : {
                exclude : ['password','username']
            }
        })

        if(!user){
            return res.status(404).send({message : "No Have Friends ..."})
        }

        res.status(200).send(user)

    } catch (error) {
        next(error)
    }
}

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
            receiver_id : req.body.target_id,
            status : 'REQUESTED'
        })

        res.status(201).send({message : 'Create Friend Request'})

    } catch (error) {
        next(error)
    }
}

const acceptFriend = async(req,res,next) => {

    try {
        const {friend_id} = req.body
        const friend = await Friend.findOne({ 
            where : {
                status : 'REQUESTED',
                sender_id : friend_id,
                receiver_id : req.user.id
            }
        })


        if(!friend) {
            return res.status(404).send({message : 'Friend not found'})
        }

        await friend.update({status : "ACCEPTED"})
        res.status(200).send({message : "Accept Friend Complete"})
        
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

const deleteFriend = async (req,res,next) =>  {
    try {

        const {friend_id} = req.body
        const friend = await Friend.findOne({ 
            where : {
                // id : req.params.id
                [Op.or] : [
                    {
                        // id : req.params.id,
                        sender_id : req.user.id,
                        receiver_id : friend_id
                    },
                    {
                        // id : req.params.id,
                        receiver_id : req.user.id,
                        sender_id : friend_id
                    }
                ]
            }
        })


        if(!friend) {
            return res.status(404).send({message : 'Friend not found'})
        }

        if(friend.sender_id !== req.user.id && friend.receiver_id !== req.user.id){
            return res.status(403).send({message: "Cannot Unfriend"})
        }
        


        // if (friend.sender_id === req.user.id || friend.receiver_id === req.user.id){
        // }
        
        await friend.destroy()
        
        res.status(204).send({message : "Delete Friend Successfully"})
        // res.status(400).send({message : "Cannot Delete Friend"})


    } catch (error) {
        next(error)
    }
}

const unFriend = async (req,res,next) =>  {
    try {

      

        const friend = await Friend.findOne({ 
            where : {
                id : req.params.id
                // [Op.or] : [
                //     {
                //         id : req.params.id,
                //         sender_id : req.user.id,
                //     },
                //     {
                //         id : req.params.id,
                //         receiver_id : req.user.id
                //     }
                // ]
            }
        })

        // const friend = await Friend.findOne({where : req.params.id})

        if(!friend) {
            return res.status(404).send({message : 'Friend not found'})
        }

        if(friend.sender_id !== req.user.id && friend.receiver_id !== req.user.id){
            return res.status(403).send({message: "Cannot Unfriend"})
        }
        


        // if (friend.sender_id === req.user.id || friend.receiver_id === req.user.id){
        // }
        
        await friend.destroy()
        
        res.status(204).send({message : "Delete Friend Successfully"})
        // res.status(400).send({message : "Cannot Delete Friend"})


    } catch (error) {
        next(error)
    }
}

module.exports = {
    addFriend,
    accept,
    unFriend,
    getAllFriends,
    deleteFriend,
    getUnKnown,
    acceptFriend
}