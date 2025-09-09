const express = require('express');
const User = require('../models/user'); 

const router = express.Router();

// Get the QR code for a user
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.qrCode) {
      return res.status(404).json({ message: 'QR code not found for this user' });
    }

    res.json({ qrCode: user.qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
