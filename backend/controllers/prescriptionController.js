const Prescription = require('../models/prescriptionModel');

// @desc    Get prescriptions for a logged-in user
// @route   GET /api/prescriptions/myprescriptions
// @access  Private
const getMyPrescriptions = async (req, res) => {
  try {
    // req.user is available because of our 'protect' middleware
    const prescriptions = await Prescription.find({ patient: req.user._id })
      .populate('doctor', 'name specialization'); // Also fetch doctor info
      
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = { getMyPrescriptions };