const {Hcus, Order, Customer, Shop, Invoice, InList, Report,Rphoto} = require('../models') 

const getHistory = async(req,res,next) => {
    try {

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        const history = await Hcus.findAll({
            where : {
                CustomerId : customer.id,
                isDelete : "NO"
            },
            include : [
                {
                    model : Order
                },
                {
                    model : Customer
                }
            ]
        })

        return res.status(200).send(history)

        
    } catch (error) {
        next(error)
    }   
}

const getOneHistory = async(req,res,next) => {
    try {

        const {id} = req.params // order order id

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        const history = await Hcus.findOne({
            where : {
                OrderId : id,
                CustomerId : customer.id
            },
            include : [
                {
                    model : Order,
                    include : [
                        {
                            model : Shop
                        },
                        {
                            model : Invoice,
                            include : [
                                {
                                    model : InList
                                }
                            ]
                        },
                        {
                            model : Report,
                            include : [
                                {
                                    model : Rphoto
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        if(!history) return res.status(404).send({message : 'history not found'})

        return res.status(200).send(history)
        
    } catch (error) {
        next(error)
    }
}

const createHistory = async(req,res,next) => {
    try {

        const {order_id} = req.body

        const order = await Order.findOne({where : {id : order_id}})
        if(!order) return res.status(404).send({message : 'order not found'})

        const history = await Hcus.findOne({
            where : {
                OrderId : order.id,
                CustomerId : order.CustomerId
            }
        })

        if(history) return res.status(400).send({message : 'history has already been'})

        const newHistory = await Hcus.create({
            OrderId : order.id,
            CustomerId : order.CustomerId
        })


        // if(!newHistory) return res.status(400).send({message : 'cannot create the history of customer'})

        return res.status(201).send(newHistory)

        
    } catch (error) {
        next(error)
        if(res.status===400) return
    }   
}

const updateDelete = async(req,res,next) => {
    try {
        const {id} = req.params // order id
        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})
        
        const history = await Hcus.findOne({
            where : {
                OrderId : id,
                CustomerId : customer.id
            }
        })

        if (!history) return res.status(404).send({message : 'No have history'})
        if(history.isDelete === "YES") return res.status(400).send({message : 'Has Deleted before'})

        await history.update({
            isDelete : 'YES'
        })

        return res.status(200).send({message : 'Hide the history complete'})


        
    } catch (error) {
        next(error)
    }
}

const deleteAll = async(req,res,next) => {
    try {
        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        const history = await Hcus.findAll({
            where : {
                CustomerId : customer.id
            }
        })

        for(let i=0; i<history.length ; i++){
            await history[i].update({
                    isDelete : "YES"
            })
        }

        // if(!history) return res.status(404).send({message : 'history not found'})
        return res.status(200).send(history)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getHistory,
    createHistory,
    updateDelete,
    getOneHistory,
    deleteAll
}