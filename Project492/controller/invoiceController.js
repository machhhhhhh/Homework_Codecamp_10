const {Invoice,Customer,Shop, Order, InList} = require('../models')
const fs = require('fs')
const cloundinary = require('cloudinary').v2
const util = require('util')

const uploadPromise = util.promisify(cloundinary.uploader.upload)
const destroyPromise = util.promisify(cloundinary.uploader.destroy)

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
                },
                {
                    model : InList
                }
            ]
        })
        
        if(!invoice) return res.status(404).send({message : 'invoice not found'})

        return res.status(200).send(invoice)

    } catch (error) {
        next(error)
    }
}

const checkInvoice = async(req,res,next) => {
    try {
        const {id} = req.params // order id

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(customer) return res.status(404).send({message : 'customer cannot get by id'})

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(!shop) return res.status(400).send({message : 'shop not found'})

        const invoice = await Invoice.findOne({
            where : {
                OrderId : id,
                ShopId : shop.id
            }
        })

        if(!invoice) return res.status(200).send({check : true, message : 'can make invoice'})
        return res.status(200).send({check : false, message: 'already have invoice', invoice})

    } catch (error) {
        next(error)
    }
}


const isPay = async(req,res,next) => {
    try {

        const {id} = req.params // order id

        
        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message : 'shop cannot get by id'})
        
        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})
        
        const invoice = await Invoice.findOne({
            where : {
                OrderId : id,
                CustomerId : customer.id
            },
            include : [
                {
                    model : InList
                }
            ]
        })

        if(!invoice) return res.status(200).send({check : false, invoice})
        return res.status(200).send({check : true, invoice})

        // if (shop) {
        //     if(invoice.ShopId !== shop.id) return res.status(400).send({message : 'not shop who create the invoice'})
        //     else {
        //         if(invoice.isPay === "NO") return res.status(200).send({message : 'not pay' , invoice})
        //         else return res.status(200).send({message : "Paid !!.", invoice})
        //     }
        // }

        // return res.status(400).send({message : 'something go wrongs !!!'})        

        
    } catch (error) {
        next(error)
    }
}


const createInvoice = async(req,res,next) => {
    try {

        const {order_id} = req.body

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if (customer) return res.status(400).send({message : 'customer cannot create invoice'})
        
        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})

        const order = await Order.findOne({where : { id : order_id}})
        if(!order) return res.status(404).send({message : 'order not found'})

        if(order.ShopId !== shop.id) return res.status(400).send({message : 'cannot make invoice'})


        const checkInvoice = await Invoice.findOne({
            where : {
                CustomerId : order.CustomerId,
                ShopId : order.ShopId,
                OrderId : order.id
            }
        })

        if(checkInvoice) return res.status(400).send({message : 'invoice has already created'})

        let image = {}
        if(req.file){
            image = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        }

        const newInvoice = await Invoice.create({
            photo : image.secure_url,
            OrderId : order.id,
            CustomerId : order.CustomerId,
            ShopId : order.ShopId,
            isPay : "NO"
        })

        // go ahead create the list in forntend before call
        // after create list finish     

        if(!newInvoice) return res.status(400).send({message : 'cannot create invoice'})


        return res.status(201).send(newInvoice)

    } catch (error) {
        next(error)
    }
}


const addList = async (req,res,next) => {
    try {
        const {invoice_id, description} = req.body

        const invoice = await Invoice.findOne({where : {id : invoice_id}})
        if(!invoice) return res.status(404).send({message: 'invoice not found'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(customer) return res.status(400).send({message : 'customer cannot create invoice list'})
        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})


        if(shop.id !== invoice.ShopId) return res.status(400).send({message : 'no shop who make invoice'})


        const list = await InList.create({
            description : description,
            InvoiceId : invoice_id
        })

        return res.status(200).send(list)

        
    } catch (error) {
        next(error)
    }
}


const payInvoice = async(req,res,next) => {
    try {
        const {id} = req.params // order id

        

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message : 'shop only can make invoice (cannot pay)'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        const invoice = await Invoice.findOne({
            where : {
                OrderId : id,
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
                },
                {
                    model : InList
                }
            ]
        })
        if(!invoice) return res.status(404).send({message : 'invoice not found'})

        if(invoice.CustomerId !== customer.id) return res.status(400).send({message : 'cannot pay invoice that not yours'})
        // if(invoice.isPay === 'YES') return res.status(400).send({message : 'has already pay'})


        let image = {}
        if(req.file){
            image = await uploadPromise(req.file.path)
            if(req.user.invoiceImg){
                const splited = req.user.invoiceImg.split('/')
                destroyPromise(splited[splited.length -1].split('.')[0],(err, result) => {})
            }
            fs.unlinkSync(req.file.path)
        }

        await invoice.update({
            photo : image.secure_url,
            isPay : "YES"
        })

        return res.status(200).send(invoice)
        
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getInvoice,
    createInvoice,
    payInvoice,
    addList,
    isPay,
    checkInvoice
}