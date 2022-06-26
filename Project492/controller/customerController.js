const {Customer, Shop} = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloundinary = require('cloudinary').v2
const fs = require('fs')
const storage = require('node-sessionstorage')

const getAllUser = async(req,res,next) => {
    try {

        const all_customer = await Customer.findAll()
        if(!all_customer) return res.status(404).send({message : 'customer not found'})
        return res.status(200).send(all_customer)

        
    } catch (error) {
        next(error)
    }
}

const getUser = async(req,res,next) => {
    try {

        const customer = await Customer.findAll()

        // const customer = await Customer.findOne({
        //     where : {
        //         username : req.user.username,
        //     }
        // })
        // if (!customer) {
        //     const shop = await Shop.findOne({
        //         where : {
        //             username : req.user.username,
        //         }
        //     })
        //     if(!shop) return res.status(404).send({message : 'user not found'})
        //     return res.status(200).send(shop)
        // }
        return res.status(200).send(customer)
    } catch (error) {
        next(error)
    }
}
const userLogin = async(req,res,next) => {
    try {

        const customer = await Customer.findOne({where : {username : req.body.username}})
        if(!customer) {
            const shop = await Shop.findOne({where : {username : req.body.username}})
            if(!shop) return res.status(404).send({message : 'user not found'})

            const checkPassword = bcryptjs.compareSync(req.body.password, shop.password)
            if(!checkPassword) return res.status(400).send({message : 'password not correct'})

            const payload = {
                id : shop.id,
                username : shop.username,
                firstname: shop.firstname,
                lastname:  shop.lastname,
                shopname : shop.shopname,
                latitude : shop.latitude,
                longitude : shop.longitude
            }
            
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {expiresIn : 3600 * 5})
            
            storage.setItem('token',token)

            return res.status(200).send({token, message : 'shop'})
        }

        const checkPassword = bcryptjs.compareSync(req.body.password, customer.password)
        if (!checkPassword) return res.status(400).send({message : 'password not correct'})

        const payload = {
            id : customer.id,
            username : customer.username,
            firstname : customer.firstname,
            lastname : customer.lastname,
        }

        const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {expiresIn: 3600 * 5})
        storage.setItem('token',token)

        return res.status(200).send({token, message : 'customer'})

    } catch (error) {
        next(error)
    }
}
const userRegister = async(req,res,next) => {
    try {

        const customer = await Customer.findOne({ where : {username : req.body.username} })
        if(customer) return res.status(400).send({message : 'username already taken'})

        const salt = bcryptjs.genSaltSync(12)
        const hash = bcryptjs.hashSync(req.body.password, salt)

        const user = await Customer.create({
            username : req.body.username,
            password : hash,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone
        })

        if(!user) return res.status(400).send({message : 'cannot create customer'})

        return res.status(201).send(user)

    } catch (error) {
        next(error)
    }
}

const updateProfile = async(req,res,next) => {
    try {

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer){
            res.status(404).send({message : 'Customer not found'})
        }

        cloundinary.uploader.upload(req.file.path, async (err,result)=>{ // set photo in public to clound
            if(err) return next(err)

            await customer.update({
                image : result.secure_url,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
            }) // push photo from clond to database
            
            if(req.user.customerImg){
                const splited = req.user.customerImg.split('/')
                cloundinary.uploader.destroy(
                    splited[splited.length -1],split('.')[0],
                    (err, result) => {}
                )
            }

            fs.unlinkSync(req.file.path)
            res.status(201).send({message : 'Change Profile Photo complete'})
        })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllUser,
    getUser,
    updateProfile,
    userLogin,
    userRegister
}