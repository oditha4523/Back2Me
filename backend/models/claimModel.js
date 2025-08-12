const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    claimantName: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ClaimRequest = mongoose.model('ClaimRequest', claimSchema);

module.exports = ClaimRequest;
