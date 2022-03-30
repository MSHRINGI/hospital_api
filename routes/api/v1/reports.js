const express = require('express');
const passport = require('passport');
const router = express.Router();

const reportsController = require('../../../controllers/api/v1/reports_controller');

// this is for http://localhost:8822/api/v1/reports/:status
router.get('/:status', passport.authenticate('jwt', {session: false}), reportsController.status);

module.exports = router;