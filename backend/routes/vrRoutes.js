const express = require('express');
const router = express.Router();
const { startVRSession } = require('../controllers/vrController.js');
const { protect } = require('../middleware/authMiddleware');

router.post('/session', protect, startVRSession);

module.exports = router;