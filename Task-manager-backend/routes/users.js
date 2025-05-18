const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
// Get all users (for assigning tasks)
router.get('/',  async (req, res) => {
  try {
    const users = await User.find({}, '_id name');
    res.json(users.map(user => ({ id: user._id, name: user.name })));
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
//Get login User notification
router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.notifications || []);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
//Archive the notification
router.patch('/notifications/:notificationId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const notification = user.notifications.find(
      n => n._id.toString() === req.params.notificationId
    );
    
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    // Update the status to 'read' or 'archived' as desired
    notification.read = true;
    notification.status = 'archived'; // Could also be 'read' if that's all you want

    await user.save();
    res.json({ message: 'Notification updated' });
  } catch (err) {
    console.error('Error updating notification:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
//delete the notification
router.delete('/notifications/:notificationId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const index = user.notifications.findIndex(
      n=> n._id.toString() === req.params.notificationId
    );
    if (index === -1) return res.status(404).json({ message: 'Notification not found' });

    user.notifications.splice(index, 1);
    await user.save();

    res.json({ message: 'Notification deleted' });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
 