// models/appointmentModel.js
const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Links to the User model
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Also links to the User model
    },
    problemDescription: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date, // Doctor will set this
    },
    appointmentTime: {
      type: String, // Doctor will set this
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;