const {Hshop, Order, Shop} = require('../models') 

const getHistory = async(req,res,next) => {
    try {
        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})

        const history = await Hshop.findAll({
            where : {
                ShopId : shop.id,
                isDelete : "NO"
            },
            include : [
                {
                    model : Order
                },
                {
                    model : Shop
                }
            ]
        })

        return res.status(200).send(history)

        
    } catch (error) {
        next(error)
    }   
}
const createHistory = async(req,res,next) => {
    try {
        const {order_id, shop_id} = req.body

        const order = await Order.findOne({where : {id : order_id}})
        if(!order) return res.status(404).send({messsage : 'order not found'})

        const shop = await Shop.findOne({where : {id : shop_id}})
        if(!shop) return res.status(404).send({message : 'shop not found'})

        const history = await Hshop.findOne({
            where : {
                OrderId : order.id,
                ShopId : shop.id
            }
        })

        if(history) return res.status(400).send({message : 'history has already been'})
        
        const newHistory = await Hshop.create({
            OrderId : order.id,
            ShopId : shop.id
        })

        return res.status(200).send(newHistory)

    } catch (error) {
        next(error)
    }   
}

const updateDelete = async(req,res,next) => {
    try {
        const {id} = req.params // order id
        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})
        
        const history = await Hshop.findOne({
            where : {
                OrderId : id,
                ShopId : shop.id
            }
        })

        if (!history) return res.status(404).send({message : 'No have history'})

        await history.update({
            isDelete : 'YES'
        })

        return res.status(200).send({message : 'Hide the history complete'})


        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getHistory,
    createHistory,
    updateDelete
}