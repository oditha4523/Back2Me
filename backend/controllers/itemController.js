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
    // If protect middleware is used, req.user will exist
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    const { name, description, location, category } = req.body;

    if (!name || !description || !location || !category) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newItem = new Item({
      name,
      category,
      description,
      location,
      imageUrl,
      reporter: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
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
