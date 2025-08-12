const express = require('express');
const router = express.Router();
const upload =require('../middleware/uploadMiddleware')

const {
  getAllItems,
  addItem,
  getItemById,
  deleteItem,
} = require('../controllers/itemController');

router.get('/', getAllItems);
router.post('/',upload.single('image'), addItem);
router.get('/:id', getItemById);
router.delete('/:id', deleteItem);

module.exports = router;
