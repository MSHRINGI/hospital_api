const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        unique: true,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    reports:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Report'
        }
    ]
},{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;