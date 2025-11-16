
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
