const router = require('express').Router();
const { createJob, getJobs, getJobById, getMyJobs, updateJob, deleteJob } = require('../controllers/job.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.get('/', getJobs);
router.get('/my', protect, restrictTo('employer'), getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, restrictTo('employer'), createJob);
router.patch('/:id', protect, restrictTo('employer'), updateJob);
router.delete('/:id', protect, restrictTo('employer'), deleteJob);

module.exports = router;
