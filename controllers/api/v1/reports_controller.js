const Report = require('../../../models/report');

// for List all the reports of all the patients filtered by a specific status
module.exports.status = async function(req, res){
    try{

        // find all the reports with desired status
        let desired_reports = await Report.find({status:req.params.status}).populate('patient', 'name phone_number createdAt');
        return res.status(200).json({
            message: `Here all the reports with status ${req.params.status}`,
            Reports: desired_reports
        });
    }catch(err){
        console.log("******* Error in fetching report with specific status********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in fetching report with specific status" }
        });
    }
}