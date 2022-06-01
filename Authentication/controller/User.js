const db = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async(req,res) => {

    const User = await db.User.findOne({where : { username : req.body.username}})

    if (!User) {
        res.status(404).send({message : 'User Not Found'})
    }
   else {
       const checkPassword = bcryptjs.compareSync(req.body.password,User.password)

       if (checkPassword){
            const payload = {
                name : User.name,
                id : User.id,
            }

            const token  = jwt.sign(payload, process.env.SECRET_OR_KEY, {expiresIn: 3600 * 5})

            res.status(200).send({
                token : token,
                message : 'Login Successfully'
            })

       }
       else {
           res.status(400).send({message : 'Password not correct'})
       }
   }

   // redirect to index page ....
   
}

// const logout = async(req,res) => {

// }

const register = async(req,res) => {

    const User = await db.User.findOne({where : { username : req.body.username}})
    if (User){
        res.status(400).send({message : 'Username already taken'})
    }
    else {

        const salt = bcryptjs.genSaltSync(12)
        const hash = bcryptjs.hashSync(req.body.password, salt)

        const newUser = await db.User.create({
            username : req.body.username,
            password : hash,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            image : req.body.image
        })

        res.status(201).send({message : 'User Created'})

    }

}

const getUser = async (req,res) => {
    const user = await db.User.findAll()
    res.status(200).send(user)
}

module.exports = {
    login,
    register,
    // logout,
    getUser
}