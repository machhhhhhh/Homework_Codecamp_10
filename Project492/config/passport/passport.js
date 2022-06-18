const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const db = require('../../models')

const option = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_OR_KEY
}

const JWTStrategy = new Strategy(option,async ( payload, done) => {
    const customer = await db.Customer.findOne({ where : { username : payload.username}})

    if (customer) {
        done(null, customer)
    }
    else {
        const shop = await db.Shop.findOne({where : {username : payload.username}})
        if(shop) {
            done(null, shop)
        } 
        else {
            done(null, false)
        }
    }

})

passport.use('jwt', JWTStrategy)