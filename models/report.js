const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    createdBy:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['Negative','Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
},{
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;