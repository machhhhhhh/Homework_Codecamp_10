const {Ophoto, Customer, Order, Shop} = require('../models')
const fs = require('fs')
const cloundinary = require('cloudinary').v2
const util = require('util')

const uploadPromise = util.promisify(cloundinary.uploader.upload)
// const destroyPromise = util.promisify(cloundinary.uploader.destroy)

const createPhoto = async(req,res,next) => {
    try {

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message : 'shop cannot create order photo'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if (!customer) return res.status(404).send({message : 'customer not found'})

        const {order_id} = req.body
        const order = await Order.findOne({where : {id : order_id}})
        if (!order) return res.status(404).send({message : 'order not found'})

        if(order.CustomerId !== customer.id) return res.status(400).send({message : 'only customer who report can add the photo'})

        if(!req.file) return res.status(404).send({message : 'Add the photo'})

        let image = {}
        if(req.file){
            image = await uploadPromise(req.file.path)
            // console.log(req.file);
            fs.unlinkSync(req.file.path)
            // console.log(img);
        }

        const newPhoto = await Ophoto.create({
            photo : image.secure_url,
            OrderId : order.id
        })

        if(!newPhoto) return res.status(400).send({message : 'cannot create the photo'})

        return res.status(201).send(newPhoto)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPhoto
}