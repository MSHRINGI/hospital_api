const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

// for creating the doctor into the database
module.exports.register = async function(req, res){
    try{

        // in case password and confirm password did not match
        if(req.body.password != req.body.confirm_password){
            return res.status(500).json({
                data:{
                    message: "Password & Confirm Password did not match"
                }
            });
        }

        // find the doctor with the username
        let doctor = await Doctor.findOne({username: req.body.username});

        // if doctor not found then create a doctor
        if(!doctor){
            doctor = await Doctor.create(req.body);
            return res.status(200).json({
                data:{
                    message: "Doctor Registered Successfully",
                    Doctor: doctor
                }
            });
        }else{
            return res.status(200).json({
                data:{
                    message: "Seems you already registered ! please login"
                }
            });
        }
    }catch(err){
        console.log("******* Error in registering doctor ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in registering doctor" }
        });
    }
}

// for login the doctor we used passport jwt authentication
module.exports.login = async function(req, res){
    try{

        // find the doctor with the username from body
        let doctor = await Doctor.findOne({username: req.body.username});

        // if doctor not found or password not matched
        if(!doctor || doctor.password != req.body.password){
            return res.status(500).json({
                data:{
                    message: "Invalid user or password"
                }
            });
        }

        // if doctor found and password matched then genrate a token
        return res.status(200).json({
            message : "Here is your token | keep it safe",
            token : jwt.sign(doctor.toJSON(), env.jwt_secret, {expiresIn : 1000*60*10})
        });

    }catch(err){
        console.log("******* Error in login to doctor ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in login to doctor" }
        });
    }
}