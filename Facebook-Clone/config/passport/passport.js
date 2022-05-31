const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const db = require('../../models')

const option = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_OR_KEY
}

const JWTStrategy = new Strategy(option,async ( payload, done) => {
    const user = await db.User.findOne({ where : { id : payload.id}})

    if (user) {
        done(null, User)
    }
    else {
        done(null, false)
    }

})

passport.use('jwt', JWTStrategy)