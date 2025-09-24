const express = require('express');
const { createClaim, getClaimsForItem } = require('../controllers/claimController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Submit a claim (with optional proof image)
router.post('/', authMiddleware, upload.single('proofImage'), createClaim);

// Get all claims for a specific item
router.get('/:itemId', authMiddleware, getClaimsForItem);

module.exports = router;


