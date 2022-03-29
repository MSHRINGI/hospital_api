const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
const jwt = require('jsonwebtoken');
let doctor;

// for registering the patient
module.exports.register = async function(req, res){

    // for fetching the logged in Doctor from jsonwebtocken
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    doctor = jwt.verify(token[1], 'secret');

    try{
        // let's find the Patient with phone number
        let patient = await Patient.findOne({phone_number: req.body.phone_number});

        // if patient found with that phone number then don't create the patient else create a patient
        if(patient){
            await patient.populate('reports')
            return res.status(200).json({
                message: "Patient is already exits with this phone number",
                patient: patient
            })
        }else{
            patient = await Patient.create({
                name: req.body.name,
                phone_number: req.body.phone_number,
                doctor: doctor._id
            })
            await patient.populate('doctor', 'name username');
            return res.status(200).json({
                data: {
                    message:"Patient Created Successfully",
                    patient: patient
                }
            })
        }
    }catch(err){
        console.log("******* Error in registering patient ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in registering patient" }
        });
    }
}

// for creating patient report after the doctor logged in
module.exports.create_report = async function(req, res){

    // for fetching the logged in Doctor from jsonwebtocken    
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    doctor = jwt.verify(token[1], 'secret');

    try{

        // find patient from the id
        let patient = await Patient.findById(req.params.id).populate('reports');

        // if patient not found then no need to create report else create a report
        if(!patient){
            console.log("Patient not found");
            return res.status(404).json({
                data:{
                    message: "Patient not found"
                }
            });
        }else{
            let report = await Report.create({
                createdBy: doctor.username,
                status: req.body.status,
                patient: patient._id
            });
            await report.populate('patient', 'name phone_number');

            // push the report into the reports Array in Patient Schema
            await patient.reports.push(report);
            patient.save();
            return res.status(200).json({
                data:{
                    message: "Patient's Report Created Successfully",
                    report: report
                }
            });
        }
    }catch(err){
        console.log("******* Error in creating report ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in creating report" }
        });
    }
}

// for fetching all reports of the patient
module.exports.all_reports = async function(req, res){
    try{

        // find the patient with the id from params
        let patient = await Patient.findById(req.params.id).populate('reports', 'createdBy status createdAt');
        
        // if patient found then returna all the reports of the patient from the reports Array in Patient Schema
        if(patient){
            return res.status(200).json({
                data:{
                    message: "Here are all the reports of the patient",
                    Patient_Name: patient.name,
                    Patient_Phone_Number: patient.phone_number,
                    reports: patient.reports
                }
            });
        }else{
            console.log("Patient not found");
            return res.status(404).json({
                data:{
                    message: "Patient not found"
                }
            });
        }

    }catch(err){
        console.log("******* Error in fetching report ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in fetching report" }
        });
    }
}