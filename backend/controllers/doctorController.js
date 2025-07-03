const Doctor = require('../models/doctorModel');

// @desc    Fetch all doctors (or search by specialization)
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  const keyword = req.query.search
    ? {
        specialization: {
          $regex: req.query.search,
          $options: 'i', // case-insensitive
        },
      }
    : {};

  try {
    const doctors = await Doctor.find({ ...keyword });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = { getDoctors };