const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
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