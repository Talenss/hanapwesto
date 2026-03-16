const router = require('express').Router();
const { getWorkers, getUserById, updateProfile, getUserRatings } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/workers', getWorkers);
router.get('/:id', getUserById);
router.get('/:id/ratings', getUserRatings);
router.patch('/me', protect, updateProfile);

module.exports = router;
