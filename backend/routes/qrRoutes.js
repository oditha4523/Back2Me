const express = require('express');
const QRCode = require('qrcode');
const User = require('../models/user'); 

const router = express.Router();

// Generate QR code for a user
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If QR already exists, return it
    if (user.qrCode) {
      return res.json({ qrCode: user.qrCode });
    }

    // Create unique data (this is what the QR code encodes)
    const qrData = `http://localhost:5173/user/${user._id}`;

    // Generate QR code as Base64
    const qrCode = await QRCode.toDataURL(qrData);

    // Save it in DB for future use
    user.qrCode = qrCode;
    await user.save();

    res.json({ qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
