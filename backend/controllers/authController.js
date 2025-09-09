const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
// const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');


// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // 2. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Generate QR code before saving a user
    const tempId = new mongoose.Types.ObjectId();
    const qrData = `http://localhost:5173/user/${tempId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    // 5. Create user with QR code included
    const user = await User.create({
      _id: tempId,         // assign the temp ID as _id
      name,
      email,
      password: hashedPassword,
      qrCode
    });


     // 6. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 7. Respond with user info and token
    res.status(201).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, qrCode: user.qrCode },
        token
      });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================================================================================

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // make sure you have this in .env
      { expiresIn: '1d' }
    );

    // 4. Respond with user info + token
    res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { registerUser, login };
