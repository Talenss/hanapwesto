const router = require('express').Router();
const { getMyNotifications, markRead, markAllRead } = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getMyNotifications);
router.patch('/:id/read', protect, markRead);
router.patch('/read-all', protect, markAllRead);

module.exports = router;
