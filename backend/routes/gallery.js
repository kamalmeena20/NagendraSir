const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addImage,
  getImages,
  updateImage,
  deleteImage
} = require('../controllers/galleryController');

// public
router.get('/', getImages);

// admin
router.post('/add', auth, addImage);
router.put('/update/:id', auth, updateImage);
router.delete('/delete/:id', auth, deleteImage);

module.exports = router;
