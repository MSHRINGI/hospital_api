const express = require('express');
const router = express.Router();

const reportsController = require('../../../controllers/api/v1/reports_controller');

// this is for http://localhost:8822/api/v1/reports/:status
router.get('/:status', reportsController.status);

module.exports = router;