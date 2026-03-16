const router = require('express').Router();
const { submitRating, getUserRatings } = require('../controllers/rating.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, submitRating);
router.get('/user/:userId', getUserRatings);

module.exports = router;
