const e = require('express')
const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const db = require('../../models')

const option = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_OR_KEY
}

const JWTStrategy = new Strategy(option,async ( payload, done) => {
    const customer = await db.Customer.findOne({ where : { id : payload.id}})

    if (customer) {
        done(null, customer)
    }
    else {
        const shop = await db.Shop.findOne({where : {id : payload.id}})
        if(shop) {
            done(null, shop)
        } 
        else {
            done(null, false)
        }
    }

})

passport.use('jwt', JWTStrategy)