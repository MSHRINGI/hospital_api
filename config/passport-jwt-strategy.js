const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');
const env = require('./environment');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    Doctor.findById(jwtPayLoad._id, function(err, doctor){
        if(err){
            return res.status(500).json({
                data:{
                    message: "Error in finding user from JWT"
                }
            });
        }
        if(doctor){
            return done(null, doctor);
        }else{
            return done(null, false);
        }
    });
}))



module.exports = passport; 