const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const db = require('../../models')

const option = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_OR_KEY
}

const JWTStrategy = new Strategy(option,async ( payload, done) => {
    const User = await db.User.findOne({ where : { id : payload.id}})

    if (User) {
        done(null, User)
    }
    else {
        done(null, false)
    }

})

passport.use('jwt', JWTStrategy)