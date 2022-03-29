const express = require('express');
const router = express.Router();

const doctorsController = require('../../../controllers/api/v1/doctors_contoller');

// this is for http://localhost:8822/api/v1/doctors/register
router.post('/register', doctorsController.register);

// this is for http://localhost:8822/api/v1/doctors/login
router.post('/login', doctorsController.login);

module.exports = router;