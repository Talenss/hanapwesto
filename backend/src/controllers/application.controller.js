const Application = require('../models/application.model');
const Job = require('../models/job.model');
const Notification = require('../models/notification.model');
const User = require('../models/user.model');

exports.apply = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job || job.status !== 'open') return res.status(400).json({ message: 'Job is not available.' });
    if (req.user.role !== 'worker') return res.status(403).json({ message: 'Only workers can apply.' });

    const existing = await Application.findOne({ job: job._id, worker: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already applied.' });

    const application = await Application.create({
      job: job._id, worker: req.user._id,
      employer: job.employer, message: req.body.message
    });

    await Job.findByIdAndUpdate(job._id, { $addToSet: { applicants: req.user._id } });

    await Notification.create({
      recipient: job.employer,
      type: 'application_received',
      title: 'New application!',
      message: `${req.user.name} applied for "${job.title}"`,
      link: `/employer/applications`,
      data: { applicationId: application._id, jobId: job._id }
    });

    res.status(201).json({ application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ worker: req.user._id })
      .populate('job', 'title category barangay payAmount payType status')
      .populate('employer', 'name businessName avatar')
      .sort({ createdAt: -1 });
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.jobId, employer: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found.' });

    const applications = await Application.find({ job: job._id })
      .populate('worker', 'name avatar barangay skills averageRating totalRatings completedJobs phone')
      .sort({ createdAt: -1 });
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id)
      .populate('job', 'title employer')
      .populate('worker', 'name');

    if (!application) return res.status(404).json({ message: 'Application not found.' });

    // Employer accepts/rejects
    if (['accepted', 'rejected'].includes(status)) {
      if (application.employer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized.' });
      }
      application.status = status;
      if (status === 'accepted') {
        await Job.findByIdAndUpdate(application.job._id, { $addToSet: { hiredWorkers: application.worker } });
      }
      await Notification.create({
        recipient: application.worker._id,
        type: status === 'accepted' ? 'application_accepted' : 'application_rejected',
        title: status === 'accepted' ? 'Application accepted!' : 'Application update',
        message: status === 'accepted'
          ? `You were accepted for "${application.job.title}"`
          : `Your application for "${application.job.title}" was not selected.`,
        link: `/worker/applications`,
      });
    }

    // Mark completed
    if (status === 'completed') {
      application.status = 'completed';
      application.completedAt = new Date();
      await User.findByIdAndUpdate(application.worker, { $inc: { completedJobs: 1 } });
    }

    await application.save();
    res.json({ application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
