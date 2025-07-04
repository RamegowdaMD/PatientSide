// // controllers/appointmentController.js
// const Appointment = require('../models/appointmentModel');
// const User = require('../models/userModel');

// // @desc    Create a new appointment request
// // @route   POST /api/appointments
// // @access  Private (Patient)
// const createAppointment = async (req, res) => {
//   const { doctorId, problemDescription } = req.body;
//   const patientId = req.user._id; // We get this from the auth middleware

//   if (!doctorId || !problemDescription) {
//     return res.status(400).json({ message: 'Please provide doctor and problem description.' });
//   }

//   try {
//     const appointment = new Appointment({
//       patient: patientId,
//       doctor: doctorId,
//       problemDescription,
//     });

//     const createdAppointment = await appointment.save();
//     res.status(201).json(createdAppointment);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error: ' + error.message });
//   }
// };

// // @desc    Get appointments for a specific doctor
// // @route   GET /api/appointments/doctor
// // @access  Private (Doctor)
// const getDoctorAppointments = async (req, res) => {
//   try {
//     // Find appointments and populate the 'patient' field with their name and email
//     const appointments = await Appointment.find({ doctor: req.user._id }).populate('patient', 'name email');
//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error: ' + error.message });
//   }
// };

// // <-- ADDED THIS NEW FUNCTION -->
// // @desc    Get only CONFIRMED appointments for a logged-in doctor
// // @route   GET /api/appointments/doctor/confirmed
// // @access  Private (Doctor)
// const getDoctorConfirmedAppointments = async (req, res) => {
//   try {
//     // Find appointments for this doctor with status 'Confirmed'
//     const appointments = await Appointment.find({ 
//         doctor: req.user._id, 
//         status: 'Confirmed' 
//     })
//     .populate('patient', 'name email') // Get patient's name and email
//     .sort({ appointmentDate: 'asc' }); // Show upcoming appointments first

//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error: ' + error.message });
//   }
// };

// // @desc    Get appointments for a specific patient
// // @route   GET /api/appointments/patient
// // @access  Private (Patient)
// const getPatientAppointments = async (req, res) => {
//   try {
//     // Find appointments and populate the 'doctor' field with their name and specialty
//     const appointments = await Appointment.find({ patient: req.user._id }).populate('doctor', 'name specialty');
//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error: ' + error.message });
//   }
// };

// // @desc    Update an appointment (e.g., confirm and set time)
// // @route   PUT /api/appointments/:id
// // @access  Private (Doctor)
// const updateAppointment = async (req, res) => {
//     const { status, appointmentDate, appointmentTime } = req.body;
//     try {
//         const appointment = await Appointment.findById(req.params.id);

//         if (appointment) {
//             // Ensure the person updating is the assigned doctor
//             if (appointment.doctor.toString() !== req.user._id.toString()) {
//                 return res.status(401).json({ message: 'Not authorized' });
//             }

//             appointment.status = status || appointment.status;
//             appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
//             appointment.appointmentTime = appointmentTime || appointment.appointmentTime;

//             const updatedAppointment = await appointment.save();
//             res.json(updatedAppointment);

//         } else {
//             res.status(404).json({ message: 'Appointment not found' });
//         }
//     } catch (error) {
//          res.status(500).json({ message: 'Server Error: ' + error.message });
//     }
// };


// module.exports = { createAppointment, getDoctorAppointments, getPatientAppointments, updateAppointment };

// backend/controllers/appointmentController.js

const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

// @desc    Create a new appointment request
// @route   POST /api/appointments
// @access  Private (Patient)
const createAppointment = async (req, res) => {
    //... (existing code is fine, no changes here)
    const { doctorId, problemDescription } = req.body;
    const patientId = req.user._id;

    if (!doctorId || !problemDescription) {
        return res.status(400).json({ message: 'Please provide doctor and problem description.' });
    }

    try {
        const appointment = new Appointment({
        patient: patientId,
        doctor: doctorId,
        problemDescription,
        });

        const createdAppointment = await appointment.save();
        res.status(201).json(createdAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Get all appointments for a specific doctor (pending, confirmed, etc.)
// @route   GET /api/appointments/doctor
// @access  Private (Doctor)
const getDoctorAppointments = async (req, res) => {
    //... (existing code is fine, no changes here)
    try {
        const appointments = await Appointment.find({ doctor: req.user._id }).populate('patient', 'name email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// <-- ADDED THIS NEW FUNCTION -->
// @desc    Get only CONFIRMED appointments for a logged-in doctor
// @route   GET /api/appointments/doctor/confirmed
// @access  Private (Doctor)
const getDoctorConfirmedAppointments = async (req, res) => {
  try {
    // Find appointments for this doctor with status 'Confirmed'
    const appointments = await Appointment.find({ 
        doctor: req.user._id, 
        status: 'Confirmed' 
    })
    .populate('patient', 'name email') // Get patient's name and email
    .sort({ appointmentDate: 'asc' }); // Show upcoming appointments first

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Get appointments for a specific patient
// @route   GET /api/appointments/patient
// @access  Private (Patient)
const getPatientAppointments = async (req, res) => {
    //... (existing code is fine, no changes here)
    try {
        const appointments = await Appointment.find({ patient: req.user._id }).populate('doctor', 'name specialty');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Update an appointment (e.g., confirm and set time)
// @route   PUT /api/appointments/:id
// @access  Private (Doctor)
const updateAppointment = async (req, res) => {
    //... (existing code is fine, no changes here)
    const { status, appointmentDate, appointmentTime } = req.body;
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (appointment) {
            if (appointment.doctor.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            appointment.status = status || appointment.status;
            appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
            appointment.appointmentTime = appointmentTime || appointment.appointmentTime;

            const updatedAppointment = await appointment.save();
            res.json(updatedAppointment);

        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
         res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// <-- EXPORT THE NEW FUNCTION -->
module.exports = { 
    createAppointment, 
    getDoctorAppointments, 
    getDoctorConfirmedAppointments, // <-- ADDED
    getPatientAppointments, 
    updateAppointment 
};