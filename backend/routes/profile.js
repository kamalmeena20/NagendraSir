

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { upsertProfile, getProfile } = require("../controllers/profileController");

router.get("/", getProfile);          // PUBLIC
router.post("/save", auth, upsertProfile);  // PROTECTED

module.exports = router;
