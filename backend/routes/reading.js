const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addReading,
  getReadings,
  updateReading,
  deleteReading
} = require('../controllers/readingController');

// public
router.get('/', getReadings);

// admin
router.post('/add', auth, addReading);
router.put('/update/:id', auth, updateReading);
router.delete('/delete/:id', auth, deleteReading);

module.exports = router;
