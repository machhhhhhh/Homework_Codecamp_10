const {Shop} = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloundinary = require('cloudinary').v2
const fs = require('fs')
const stoage = require('node-sessionstorage')


const getOnlineShop = async(req,res,next) => {
    try {
        const shop = await Shop.findAll({
            where : {
                isShopOn : 'YES'
            }
        })

        return res.status(200).send(shop)
        
    } catch (error) {
        next(error)
    }
}

const getUser = async(req,res,next) => {
    try {
        const shop = await Shop.findOne({
            where : {
                username : req.user.username,
            }
        })
        if(!shop) return res.status(404).send({message : 'shop not found'})
        return res.status(200).send(shop)
    } catch (error) {
        next(error)
    }
}
const shopLogin = async(req,res,next) => {
    try {

        const shop = await Shop.findOne({where : {username : req.body.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})

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
        
        stoage.setItem('token',token)

        return res.status(200).send({token})

    } catch (error) {
        next(error)
    }
}
const shopRegister = async(req,res,next) => {
    try {

        const shop = await Shop.findOne({ where : {username : req.body.username} })
        if(shop) return res.status(400).send({message : 'shop already taken'})

        const salt = bcryptjs.genSaltSync(12)
        const hash = bcryptjs.hashSync(req.body.password, salt)

        const user = await Shop.create({
            username : req.body.username,
            password : hash,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            shopname : req.body.shopname,
            latitude : req.body.latitude,
            longitude : req.body.longitude,
            isShopOn : "NO"
        })

        if(!user) return res.status(400).send({message : 'cannot create shop'})

        return res.status(201).send(user)
        
    } catch (error) {
        next(error)
    }
}
const updateProfile = async(req,res,next) => {
    try {
        const shop = await Shop.findOne({where : {id : req.user.id}})
        if(!shop) return res.status(404).send({message : 'shop not found'})

        cloundinary.uploader.upload(req.file.path, async (err,result)=>{ // set photo in public to clound
            if(err) return next(err)

            await shop.update({
                image : result.secure_url,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                shopname : req.body.shopname
            }) // push photo from clond to database
            
            if(req.user.shopImg){
                const splited = req.user.profileImg.split('/')
                cloundinary.uploader.destroy(
                    splited[splited.length -1],split('.')[0],
                    (err, result) => {}
                )
            }

            fs.unlinkSync(req.file.path)
            return res.status(201).send({message : 'Change Profile Photo complete'})
        })
        
    } catch (error) {
        next(error)
    }
}

const turnOn = async(req,res,next) => {
    try {

        const shop = await Shop.findOne({ where : {username : req.user.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})

        const data = await shop.update({
            isShopOn : 'YES'
        })

        return res.status(200).send({message : 'Open Shop', data})

    } catch (error) {
        next(error)
    }
}
const turnOff = async(req,res,next) => {
    try {
        const shop = await Shop.findOne({ where : {username : req.user.username}})
        if(!shop) return res.status(404).send({message : 'shop not found'})

        // const order = await

        const data = await shop.update({
            isShopOn : 'NO'
        })

        return res.status(200).send({message : 'Close Shop', data})
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUser,
    shopLogin,
    shopRegister,
    updateProfile,
    turnOff,
    turnOn,
    getOnlineShop
}