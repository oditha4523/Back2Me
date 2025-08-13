const Claim = require('../models/claimModel');
const Item = require('../models/itemModel');

// Create a new claim
const createClaim = async (req, res) => {
  try {
    const { itemId, description, contactInfo } = req.body;
    const userId = req.user.id;

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Create new claim
    const newClaim = new Claim({
      item: itemId,
      claimant: userId,
      description,
      contactInfo,
      proofImage: req.file ? req.file.path : null
    });

    await newClaim.save();

    res.status(201).json({
      message: 'Claim submitted successfully',
      claim: newClaim
    });
  } catch (error) {
    console.error('Error creating claim:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all claims for a specific item
const getClaimsForItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const claims = await Claim.find({ item: itemId })
      .populate('claimant', 'username email')
      .populate('item', 'title description');

    res.status(200).json(claims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createClaim,
  getClaimsForItem
};