// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointment,
  getAppointmentById,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have this file

router.route('/').post(protect, createAppointment);
router.route('/doctor').get(protect, getDoctorAppointments);
router.route('/patient').get(protect, getPatientAppointments);
router.route('/:id')
  .get(protect, getAppointmentById)
  .put(protect, updateAppointment);
  

module.exports = router;