const express = require('express');
const router = express.Router();
const { getMyPrescriptions } = require('../controllers/prescriptionController');
const { protect } = require('../middleware/authMiddleware');

// This route is protected. User must be logged in.
router.route('/myprescriptions').get(protect, getMyPrescriptions);


module.exports = router;