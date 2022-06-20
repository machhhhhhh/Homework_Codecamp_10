const {Invoice,Customer,Shop, Order} = require('../models')

const getInvoice = async(req,res,next) => {
    try {

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message : 'shop cannot get invoice'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        const invoice = await Invoice.findAll({
            where : {
                isPay : "NO",
                CustomerId : customer.id
            },
            include : [
                {
                    model : Customer
                },
                {
                    model : Shop
                },
                {
                    model : Order
                }
            ]
        })
        
        if(!invoice) return res.status(404).send({message : 'invoice not found'})

        return res.status(200).send(invoice)

    } catch (error) {
        next(error)
    }
}
const createInvoice = async(req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
const payInvoice = async(req,res,next) => {
    try {
        const {id} = req.params // invoice id
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getInvoice,
    createInvoice,
    payInvoice
}