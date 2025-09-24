const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: { 
      type: String, 
      required: true 
    }, 
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    reporter: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String },
      email: { type: String },
    },
    isClaimed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // auto-creates `createdAt` and `updatedAt`
  }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
