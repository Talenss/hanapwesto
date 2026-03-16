const Job = require('../models/job.model');
const Notification = require('../models/notification.model');
const User = require('../models/user.model');

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, employer: req.user._id });
    await job.populate('employer', 'name businessName barangay avatar');

    // Notify matching workers
    const workers = await User.find({
      role: 'worker', isActive: true, barangay: new RegExp(job.barangay, 'i'),
      skills: { $in: job.skillsRequired.length ? job.skillsRequired : [job.category] }
    }).select('_id');

    if (workers.length) {
      const notifications = workers.map(w => ({
        recipient: w._id,
        type: 'new_job',
        title: 'New job near you!',
        message: `${job.title} in ${job.barangay} — ₱${job.payAmount}/${job.payType}`,
        link: `/jobs/${job._id}`,
        data: { jobId: job._id }
      }));
      await Notification.insertMany(notifications);
    }

    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { search, category, barangay, payType, status = 'open', page = 1, limit = 12 } = req.query;
    const query = { status };
    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (barangay) query.barangay = new RegExp(barangay, 'i');
    if (payType) query.payType = payType;

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate('employer', 'name businessName barangay avatar averageRating')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id, { $inc: { views: 1 } }, { new: true }
    ).populate('employer', 'name businessName barangay avatar phone averageRating totalRatings');
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json({ job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user._id })
      .populate('applicants', 'name avatar barangay averageRating skills')
      .sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, employer: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized.' });
    Object.assign(job, req.body);
    await job.save();
    res.json({ job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findOneAndDelete({ _id: req.params.id, employer: req.user._id });
    res.json({ message: 'Job deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
