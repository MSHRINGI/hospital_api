const express = require('express');
const router = express.Router();
const passport = require('passport');

const patientsController = require('../../../controllers/api/v1/patients_controller');

// // this is for http://localhost:8822/api/v1/patients/register
router.post('/register', passport.authenticate('jwt', {session: false}),patientsController.register);

// // this is for http://localhost:8822/api/v1/patients/:id/create_report
router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), patientsController.create_report);

// // this is for http://localhost:8822/api/v1/patients/:id/all_reports
router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}), patientsController.all_reports);

module.exports = router;