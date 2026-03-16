const Rating = require('../models/rating.model');
const Application = require('../models/application.model');
const User = require('../models/user.model');
const Notification = require('../models/notification.model');

exports.submitRating = async (req, res) => {
  try {
    const { applicationId, score, comment } = req.body;
    const application = await Application.findById(applicationId)
      .populate('job', 'title');
    if (!application || application.status !== 'completed') {
      return res.status(400).json({ message: 'Can only rate completed jobs.' });
    }

    const rateeId = req.user.role === 'employer' ? application.worker : application.employer;

    const existing = await Rating.findOne({ application: applicationId, rater: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already rated.' });

    const rating = await Rating.create({
      application: applicationId, rater: req.user._id,
      ratee: rateeId, score, comment
    });

    // Recalculate average rating
    const allRatings = await Rating.find({ ratee: rateeId });
    const avg = allRatings.reduce((sum, r) => sum + r.score, 0) / allRatings.length;
    await User.findByIdAndUpdate(rateeId, {
      averageRating: Math.round(avg * 10) / 10,
      totalRatings: allRatings.length
    });

    await Notification.create({
      recipient: rateeId,
      type: 'new_rating',
      title: 'You received a rating!',
      message: `${req.user.name} gave you ${score} star${score > 1 ? 's' : ''} for "${application.job.title}"`,
      link: `/profile`,
    });

    res.status(201).json({ rating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ ratee: req.params.userId })
      .populate('rater', 'name avatar role businessName')
      .sort({ createdAt: -1 });
    res.json({ ratings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
