const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { saveContact, getContact } = require('../controllers/contactController');

// Public
router.get('/', getContact);

// Admin Only
router.post('/save', auth, saveContact);

module.exports = router;
