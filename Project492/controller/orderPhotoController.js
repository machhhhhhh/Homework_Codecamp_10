const {Ophoto, Customer, Order} = require('../models')
const fs = require('fs')
const cloundinary = require('cloudinary').v2
const util = require('util')

const uploadPromise = util.promisify(cloundinary.uploader.upload)
// const destroyPromise = util.promisify(cloundinary.uploader.destroy)

const createPhoto = async(req,res,next) => {
    try {

        const {order_id} = req.body
        const order = await Order.findOne({where : {id : order_id}})
        if (!order) return res.status(404).send({message : 'order not found'})

        // const customer = await Customer.findOne({where : {username : req.user.username}})
        // if (!customer) return res.status(404).send({message : 'customer not found'})

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

        return res.status(201).send(newPhoto)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPhoto
}