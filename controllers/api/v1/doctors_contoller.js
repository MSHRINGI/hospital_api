const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.register = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            return res.status(500).json({
                data:{
                    message: "Password & Confirm Password did not match"
                }
            });
        }
        let doctor = await Doctor.findOne({username: req.body.username});
        if(!doctor){
            await Doctor.create(req.body);
            return res.status(200).json({
                data:{
                    message: "Doctor Registered"
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

module.exports.login = async function(req, res){
    try{
        let doctor = await Doctor.findOne({username: req.body.username});
        if(!doctor || doctor.password != req.body.password){
            return res.status(500).json({
                data:{
                    message: "Invalid user or password"
                }
            });
        }
        return res.status(200).json({
            message : "Here is your token | keep it safe",
            token : jwt.sign(doctor.toJSON(), 'secret', {expiresIn : 1000*60*10})
        });

    }catch(err){
        console.log("******* Error in login to doctor ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in login to doctor" }
        });
    }
}