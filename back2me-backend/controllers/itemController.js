const Item = require('../models/itemModel');

// @desc    Get all lost item posts
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new item post (by finder)
const addItem = async (req, res) => {
  try {
    const { name, description, location } = req.body;

    const newItem = new Item({
      name,
      description,
      location,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item' });
  }
};


// @desc    Get a single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

// @desc    Delete an item by ID
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.remove();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};

module.exports = {
  getAllItems,
  addItem,
  getItemById,
  deleteItem,
};
