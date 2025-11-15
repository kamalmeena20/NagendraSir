

// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authMiddleware');
// const {
//   addPublication,
//   getPublications,
//   updatePublication,
//   deletePublication
// } = require('../controllers/publicationController');

// router.get('/', getPublications);
// router.post('/add', auth, addPublication);
// router.put('/update/:id', auth, updatePublication);
// router.delete('/delete/:id', auth, deletePublication);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const {
//   addPublication,
//   getPublications,
//   updatePublication,
//   deletePublication
// } = require("../controllers/publicationController");

// // Public
// router.get("/", getPublications);

// // Admin protected
// router.post("/add", auth, addPublication);
// router.put("/update/:id", auth, updatePublication);
// router.delete("/delete/:id", auth, deletePublication);

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addPublication,
  getPublications,
  updatePublication,
  deletePublication
} = require("../controllers/publicationController");

// Public route
router.get("/", getPublications);

// Admin protected routes
router.post("/add", auth, addPublication);
router.put("/update/:id", auth, updatePublication);
router.delete("/delete/:id", auth, deletePublication);

module.exports = router;
