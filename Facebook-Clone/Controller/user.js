const User = require('../models/User')
const brcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const bcryptjs = require('bcryptjs')

const login = async (req,res) => {

    const user = await db.User.findOne({where : {email : req.body.email}})

    if (!user) {

        res.status(404).send({message : 'User not Found'})

    } else {

        const checkPassword = brcryptjs.compareSync(req.body.password , user.password)

        if (checkPassword){
            const payload = {
                name : user.name,
                id : user.id
            }

            const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {expiresIn : 3600 * 5})
            res.status(200).send({
                token : token,
                message : 'Login Successfully'
            })
                    
        } else {
            res.status(400).send({message: 'password not correct'})
        }

    }

    // *****  Redirect to index page  ....

}

const register = async (req,res) => {

    const user = await db.User.findOne({where : { email : req.body.email}})

    if (user) {
        res.status(400).send({message : 'Already Have User !!!'})
    } else {
        const salt = bcryptjs.genSaltSync(12)
        const hash = bcryptjs.hashSync(req.body.password, salt)
        const newUser = await db.User.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            birthday : req.body.birthday,
            password : hash,
            phone : req.body.phone,
            image : req.body.image
        })

        res.status(201).send({
            user : newUser,
            message : 'User created'
        })
    }




}

// const getUser = async (req,res) => {

// }

module.exports = {
    login,
    register,
    // getUser
}
