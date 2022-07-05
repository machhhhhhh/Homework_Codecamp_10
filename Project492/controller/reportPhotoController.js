const {Customer, Report , Rphoto, Shop} = require('../models')
const fs = require('fs')
const cloundinary = require('cloudinary').v2
const util = require('util')

const uploadPromise = util.promisify(cloundinary.uploader.upload)
// const destroyPromise = util.promisify(cloundinary.uploader.destroy)

const addPhoto = async(req,res,next) => {
    try {

        const {report_id} = req.body
        console.log(report_id);
        console.log('body', req.body);

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message : 'shop cannot create the report photo'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        const report = await Report.findOne({where : {id : report_id}})
        if(!report) return res.status(404).send({message : 'report not found'})

        if(report.CustomerId !== customer.id) return res.status(400).send({message : 'only customer who report can add the photo'})

        if(!req.file) return res.status(400).send({message : 'Add the photo'})
        // console.log('00000000000000000000000');
        let image = {}
        if(req.file){
            image = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        }
        // console.log('111111111111111111111');
        const newPhoto = await Rphoto.create({
            photo : image.secure_url,
            ReportId : report_id
        })
        // console.log('22222222222222222');

        if(!newPhoto) return res.status(400).send({message : 'cannot create the photo'})
        return res.status(201).send(newPhoto)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addPhoto
}