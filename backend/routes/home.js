const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getHome, upsertHome } = require("../controllers/homeController");

// Public
router.get("/", getHome);

// Admin protected
router.post("/save", auth, upsertHome);

module.exports = router;
