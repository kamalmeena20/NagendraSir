const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addMember,
  getMembers,
  updateMember,
  deleteMember
} = require('../controllers/teamController');

// public
router.get('/', getMembers);

// admin
router.post('/add', auth, addMember);
router.put('/update/:id', auth, updateMember);
router.delete('/delete/:id', auth, deleteMember);

module.exports = router;
