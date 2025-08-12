import express from 'express';
import { createClaim, getClaimsForItem } from '../controllers/claimController.js';
import upload from '../middleware/upload.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit a claim (with optional proof image)
router.post('/', authMiddleware, upload.single('proofImage'), createClaim);

// Get all claims for a specific item
router.get('/:itemId', authMiddleware, getClaimsForItem);

export default router;
