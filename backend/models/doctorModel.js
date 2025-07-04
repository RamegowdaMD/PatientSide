const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    qualifications: { type: String, required: true },
    experienceInYears: { type: Number, required: true, default: 0 },
    consultationFee: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;