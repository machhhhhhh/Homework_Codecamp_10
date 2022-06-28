const {Customer, Shop} = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const storage = require('node-sessionstorage')

const getUser = async(req,res,next) => {
    try {

        const customer = await Customer.findOne({
            where : {
                username : req.user.username,
            }
        })
        if (!customer) {
            const shop = await Shop.findOne({
                where : {
                    username : req.user.username,
                }
            })
            if(!shop) return res.status(200).send({message : 'user not found'})
            return res.status(200).send({role : 'shop', ...shop.dataValues})
        }
        

        return res.status(200).send({role : 'customer', ...customer.dataValues})
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

module.exports = {
    getUser,
    userLogin
}