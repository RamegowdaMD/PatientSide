const express = require('express');
const { registerUser, loginUser, getDoctors } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/doctors').get(getDoctors);

module.exports = router;