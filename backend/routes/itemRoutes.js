const express = require('express');
const router = express.Router();
const upload =require('../middleware/uploadMiddleware')
const protect = require('../middleware/authMiddleware');

const {
  getAllItems,
  addItem,
  getItemById,
  deleteItem,
} = require('../controllers/itemController');

router.get('/', getAllItems);
router.post('/', protect, upload.single('image'), addItem);
router.get('/:id', getItemById);
router.delete('/:id', deleteItem);

module.exports = router;
