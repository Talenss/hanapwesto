const router = require('express').Router();
const { apply, getMyApplications, getJobApplications, updateApplicationStatus } = require('../controllers/application.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

router.post('/job/:jobId', protect, restrictTo('worker'), apply);
router.get('/my', protect, restrictTo('worker'), getMyApplications);
router.get('/job/:jobId', protect, restrictTo('employer'), getJobApplications);
router.patch('/:id/status', protect, updateApplicationStatus);

module.exports = router;
