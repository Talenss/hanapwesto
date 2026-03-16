const User = require('../models/user.model');
const Rating = require('../models/rating.model');

exports.getWorkers = async (req, res) => {
  try {
    const { barangay, skill, availability, page = 1, limit = 12 } = req.query;
    const query = { role: 'worker', isActive: true };
    if (barangay) query.barangay = new RegExp(barangay, 'i');
    if (skill) query.skills = { $in: [new RegExp(skill, 'i')] };
    if (availability) query.availability = availability;

    const total = await User.countDocuments(query);
    const workers = await User.find(query)
      .select('-password')
      .sort({ averageRating: -1, completedJobs: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ workers, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const allowed = ['name', 'phone', 'barangay', 'municipality', 'skills', 'availability', 'bio', 'experience', 'dailyRate', 'businessName', 'businessType'];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ ratee: req.params.id })
      .populate('rater', 'name avatar role')
      .sort({ createdAt: -1 });
    res.json({ ratings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
