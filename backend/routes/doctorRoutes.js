const express = require('express');
const { getDoctors } = require('../controllers/doctorController');
const router = express.Router();

// The search query would look like: /api/doctors?search=Cardiology
router.route('/').get(getDoctors);

module.exports = router;