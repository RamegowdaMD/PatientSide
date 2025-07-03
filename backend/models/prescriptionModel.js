const mongoose = require('mongoose');

const medicationSchema = mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true }, // e.g., "500mg"
  frequency: { type: String, required: true }, // e.g., "Twice a day"
});

const prescriptionSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Links to the User model
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor', // Links to the Doctor model
    },
    date: { type: Date, default: Date.now },
    medications: [medicationSchema],
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;