const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'construction', 'domestic', 'agriculture', 'driving',
      'electrical', 'plumbing', 'carpentry', 'laundry',
      'cooking', 'delivery', 'gardening', 'security', 'other'
    ]
  },
  skillsRequired: [{ type: String, trim: true }],
  barangay: { type: String, required: true, trim: true },
  municipality: { type: String, default: 'Pampanga' },
  payType: { type: String, enum: ['daily', 'weekly', 'monthly', 'fixed'], default: 'daily' },
  payAmount: { type: Number, required: true },
  duration: { type: String, required: true },
  startDate: { type: Date },
  slots: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'filled', 'closed'],
    default: 'open'
  },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hiredWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
}, { timestamps: true });

// Text index for search
jobSchema.index({ title: 'text', description: 'text', category: 'text' });
jobSchema.index({ barangay: 1, category: 1, status: 1 });

module.exports = mongoose.model('Job', jobSchema);
