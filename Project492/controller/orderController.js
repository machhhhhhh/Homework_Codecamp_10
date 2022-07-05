const {Order,Customer,Shop, Ophoto} = require('../models')
const {Op} = require('sequelize')
const axios = require('../config/axios/axios')

const checkFinish = async(req,res,next) => {
    try {

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer){
            const shop = await Shop.findOne({where : {username : req.user.username}})
            if(!shop) return res.status(404).send({message : 'user not found'})

            const order = await Order.findOne({
                where : {
                    isFinish : 'NO',
                    ShopId : shop.id
                },
                include : [
                    {
                        model : Customer
                    },
                    {
                        model : Shop
                    },
                    {
                        model : Ophoto
                    }
                ]
            }) 

            if(!order) return res.status(200).send(null)

            if(order.isChoose ==='NO') return res.status(200).send({check : false, order}) // waiting for decide
            if(order.isFinish ==='NO') return res.status(200).send({check :true, order}) // show

            return res.status(200).send(null)

        }
        

        const order = await Order.findOne({
            where : {
                CustomerId : customer.id,
                isFinish : 'NO'
            },
            include : [
                {
                    model : Customer
                },
                {
                    model : Shop
                },
                {
                    model : Ophoto
                }
            ]
        })

        if(!order) return res.status(200).send(null)

        if(order.ShopId == null) return res.status(200).send(null) // waiting
        if(order.isChoose === 'NO') return res.status(200).send({check : false, order}) // decide
        if(order.isFinish === 'NO') return res.status(200).send({check : true, order}) // show

        return res.status(200).send(null)

    } catch (error) {
        next(error)
    }
}

const getAllOrder = async (req,res,next) => { // every shop who are online can see every non-accept order
    try {

        
        const customer = await Customer.findOne({where : { username : req.user.username}})
        if(customer) return res.status(400).send({message : 'customer cannot get order'})

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})
        if(shop.isShopOn === 'NO') return res.status(400).send({message : 'Please open the shop'})

        const order = await Order.findAll({
            where : {
                ShopId : {
                    [Op.is] : null  // to specify for order that waiting to accept
                }
            },
            include : [
                {
                    model : Customer,
                    attributes : {
                        exclude : ['username', 'password']
                    }
                },
                {
                    model : Shop,
                    attributes : {
                        exclude : ['username', 'password']
                    }
                },
                {
                    model : Ophoto,
                    // attributes : {
                    //     exclude : ['username', 'password']
                    // }
                }
            ]
        })

        // const order = await Order.findAll({
        //     where : {
        //         ShopId : {
        //             [Op.is] : null  // to specify for order that waiting to accept
        //         }
        //     },
        //     include : [
        //         {
        //             model : Customer,
        //             attributes : {
        //                 exclude : ['username', 'password']
        //             }
        //         },
        //         {
        //             model : Shop,
        //             attributes : {
        //                 exclude : ['username', 'password']
        //             }
        //         },
        //         {
        //             model : Ophoto,
        //             // attributes : {
        //             //     exclude : ['username', 'password']
        //             // }
        //         }
        //     ]
        // })
        // if(!order) return res.status(200).send({order : null})
        return res.status(200).send(order)

    } catch (error) {
        next(error)
    }
}

const getOneOrder = async(req,res,next) => {
    try {
        const id = req.params

        const order = await Order.findOne({
            where : {
                id : id
            },
            include : [
                {
                    model : Customer
                },
                {
                    model : Shop
                },
                {
                    model : Ophoto
                }
            ]
        })

        if(!order) return res.status(404).send({message : 'order not found'})
        
        // const customer = await Customer.findOne({where : {username : req.user.username}})

        // if(!customer) {

        //     const shop = await Shop.findOne({where : {username : req.user.username}})
        //     if(!shop) return res.status(404).send({message : 'uesr not found'})

        //     const order = await Order.findOne({
        //         where : {
        //             id : id,
        //             ShopId : shop.id
        //         },
        //         include : [
        //             {
        //                 model : Customer
        //             },
        //             {
        //                 model : Ophoto
        //             }
        //         ]
        //     })

        //     if(!order) return res.status(404).send({message : 'order not found'})

        //     return res.status(200).send(order)

        // }

        // const order = await Order.findOne({
        //     where : {
        //         id : id,
        //         CustomerId : customer.id
        //     },
        //     include : [
        //         {
        //             model : Shop
        //         },
        //         {
        //             model : Ophoto
        //         }
        //     ]
        // })

        // if(!order) return res.status(404).send({message : 'order not found'})

        return res.status(200).send(order)

    } catch (error) {
        next(error)
    }
}

const getOrderOfCustomer = async (req,res,next) => {
    try {


        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message : 'shop cannot see the waiting order'})

        const customer =  await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        // const order = await Order.findAll({where : {CustomerId : req.user.id}})

        const order = await Order.findOne({
            where : {
                ShopId : {
                    [Op.is] : null  // to specify for order that waiting to accept
                },
                CustomerId : customer.id,
                // isFinish : 'NO'
            },
            include : [
                {
                    model : Customer
                },
                {
                    model : Shop
                },
                {
                    model : Ophoto
                }
            ]
        })

        // return res.status(200).send(order)

        if(!order) return res.status(200).send({check : false , message : 'No Have Order now..'})

        if(order && !order.ShopId) return res.status(200).send({check : true ,message : 'waiting for shop to accept the order', order})

        if(order.ShopId) return res.status(200).send({check : false , message : 'shop has taken the order', order})


        return res.status(200).send({check : false, order})
    } catch (error) {
        next(error)
    }
}
const addOrder = async (req,res,next) => {
    try {
        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message : 'shop cannot create order'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        if(!req.body.problem && !req.file) return res.status(400).send({message : 'Type the problem'})
        

        const isOrder = await Order.findOne({
            where : {
                ShopId : {
                    [Op.is] : null  // to specify for order that waiting to accept
                },
                CustomerId : customer.id
            }
        })

        if(isOrder) return res.status(400).send({message : 'cannot create the second order'})

        const newOrder = await Order.create({
            problem : req.body.problem,
            description : req.body.description,
            brand : req.body.brand,
            model : req.body.model,
            latitude : req.body.latitude,
            longitude : req.body.longitude,
            CustomerId : req.user.id,
            isChoose : "NO",
            isFinish : 'NO'
        })

        if(!newOrder) return res.status(400).send({message : 'cannot create order'})

        const order = await Order.findOne({
            where : { id : newOrder.id},
            include : [
                {
                    model : Customer,
                    attributes : {
                        exclude : ['username', 'password']
                    }
                },
                {
                    model : Ophoto,
                }
            ]
        })

        if (!order) return res.status(404).send({message : 'order ont found'})

        return res.status(201).send(order)

        
    } catch (error) {
        next(error)
    }
}
const acceptOrder = async (req,res,next) => {
    try {

        const order = await Order.findOne({where : {id : req.params.id}})
        if(!order) return res.status(200).send({order : null})
        if(!order.CustomerId) return res.status(400).send({message : 'order must have customer'})

        const shop = await Shop.findOne({where : {username : req.user.username}})
        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(customer) return res.status(400).send({message : 'customer cannot accept'}) 
        if(!shop) return res.status(404).send({message : 'shop not found'})
        if(shop.isShopOn === "NO") return res.status(200).send({isShopon : false})

        
        if(order.ShopId) return res.status(200).send({message : 'taken'})


        await order.update({
            ShopId : req.user.id,
        })

        const data = await Order.findOne({
            where : {id : order.id},
            include : [
                {
                    model : Customer,
                    attrbutes : {
                        exclude : ['username', 'password']
                    }
                },
                {
                    model : Shop,
                    attrbutes : {
                        exclude : ['username', 'password']
                    }
                },{
                    model : Ophoto
                }
            ]
        })

        

        return res.status(200).send({message : 'Accept Complete', data})


    } catch (error) {
        next(error)
    }
}
const cancelOrder = async (req,res,next) => {
    try {

        // const order = await Order.findOne({where : {id : req.params.id}})
        // if(!order) return res.status(404).send({message : 'order not found'})
        // if(order.CustomerId !== req.user.id) return res.status(400).send({message : 'you are not owner order'})
        
        // if(!order.ShopId && shop) return res.status(400).send({message: 'waiting for customer accept for cancel'})
        // if(order.ShopId && customer) return res.status(400).send({message : 'shop has accepted cannot delete'})

        // if(!order.ShopId && customer.id !== order.CustomerId) return res.status(400).send({message : 'you are not owner of order'})
        // if(order.ShopId && order.ShopId !== shop.id) return res.status(400).send({message : 'Not Shop who take the order'})
       
        // if(order.ShopId && order.ShopId === shop.id || (!order.ShopId && customer.id === order.CustomerId)  ) {
        //     await order.destroy()
        //     return res.status(204).send({message : 'delete order complete'})
        // }


        // else return res.status(400).send({message : 'error with condition'})
        const {id} = req.params
        const customer = await Customer.findOne({where : {username : req.user.username}})
        
        if(!customer) {
            const shop = await Shop.findOne({where : {username : req.user.username}})

            if(!shop) return res.status(404).send({message : 'user not found'})

            const order = await Order.findOne({
                where : {
                    id : id,
                    ShopId : shop.id
                }
            })
            
            if(!order) return res.status(404).send({message : 'order not found'})
            
            await order.destroy()
            return res.status(204)

        }

        const order = await Order.findOne({
            where : {
                id : id,
                CustomerId : customer.id
            }
        })

        if(!order) return res.status(404).send({message : 'order not found'})

        await order.destroy()

        return res.status(204).send({message : 'Delete Successfully'})


    } catch (error) {
        next(error)
    }
}

const choose = async(req,res,next) => {
    try {

        const {id} = req.params // order_id
        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(404).send({message : 'shop cannot choose shop'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        const order = await Order.findOne({
            where : {
                id : id,
                CustomerId : customer.id
            }
        })

        if(!order) return res.status(404).send({message : 'order not found'})

        await order.update({
            isChoose : 'YES'
        })

        return res.status(200).send(order)
        
    } catch (error) {
        next(error)
    }
}

const finishOrder = async(req,res,next) => {
    try {

        const { id } = req.params

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(customer) return res.status(400).send({message : 'customer cannot make order finish'})

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})

        const order = await Order.findOne({
            where : {
                id : id,
                ShopId : shop.id
            }
        })

        if(!order) return res.status(404).send({message : 'order not found'})

        const data = await order.update({
            isFinish : "YES"
        })

        if(!data) return res.status(400).send({message : 'cannot finish order'})

        const body = {
            order_id : data.id,
        }

        const history_customer = await axios.post('/history-customer', body)
        if(!history_customer) return res.status(400).send({message : 'cannot create history of customer'})

        const history_shop = await axios.post('/history-shop', body)
        if(!history_shop) return res.status(400).send({ message : 'cannot create history of shop'})

        const report = await axios.post("/report", body)
        if(!report) return res.status(400).send({message : 'cannot create report'})

        return res.status(200).send(data)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllOrder,
    getOrderOfCustomer,
    addOrder,
    acceptOrder,
    cancelOrder,
    getOneOrder,
    checkFinish,
    choose,
    finishOrder
}