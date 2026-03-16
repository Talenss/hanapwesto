const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['worker', 'employer'], required: true },
  phone: { type: String, trim: true },
  barangay: { type: String, required: true, trim: true },
  municipality: { type: String, default: 'Pampanga', trim: true },
  avatar: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

  // Worker-specific fields
  skills: [{ type: String, trim: true }],
  availability: {
    type: String,
    enum: ['full-time', 'part-time', 'weekends', 'flexible'],
    default: 'flexible'
  },
  bio: { type: String, maxlength: 500 },
  experience: { type: String },
  dailyRate: { type: Number, default: 0 },

  // Employer-specific fields
  businessName: { type: String, trim: true },
  businessType: { type: String, trim: true },

  // Stats
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },

}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
