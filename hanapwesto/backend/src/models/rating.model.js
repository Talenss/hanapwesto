const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  rater: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 300 },
}, { timestamps: true });

ratingSchema.index({ application: 1, rater: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
