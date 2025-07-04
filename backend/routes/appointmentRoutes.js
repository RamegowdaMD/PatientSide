// // routes/appointmentRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//   createAppointment,
//   getDoctorAppointments,
//   getPatientAppointments,
//   updateAppointment,
// } = require('../controllers/appointmentController');
// const { protect } = require('../middleware/authMiddleware'); // Assuming you have this file

// router.route('/').post(protect, createAppointment);
// router.route('/doctor').get(protect, getDoctorAppointments);
// router.route('/patient').get(protect, getPatientAppointments);
// router.route('/:id').put(protect, updateAppointment);

// module.exports = router;

// backend/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointment,
  getDoctorConfirmedAppointments, // <-- IMPORT THE NEW FUNCTION
  getAppointmentById,
} = require('../controllers/appointmentController');
const { protect, isDoctor } = require('../middleware/authMiddleware'); // <-- IMPORT isDoctor

router.route('/').post(protect, createAppointment);

// <-- ADD THE NEW ROUTE HERE -->
// This route is for getting only confirmed appointments for the logged-in doctor's schedule
router.route('/doctor/confirmed').get(protect, isDoctor, getDoctorConfirmedAppointments);

// This existing route gets ALL appointments (pending, etc.) for the doctor's management view
router.route('/doctor').get(protect, isDoctor, getDoctorAppointments);

router.route('/patient').get(protect, getPatientAppointments);
router.route('/:id').put(protect, isDoctor, updateAppointment);
router.route('/:id')
  .get(protect, getAppointmentById)
  .put(protect, updateAppointment);
  

module.exports = router;