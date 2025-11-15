const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addInstitute,
  getInstitutes,
  updateInstitute,
  deleteInstitute
} = require('../controllers/collaboratorController');

// Public GET
router.get('/', getInstitutes);

// Admin
router.post('/add', auth, addInstitute);
router.put('/update/:id', auth, updateInstitute);
router.delete('/delete/:id', auth, deleteInstitute);

module.exports = router;
