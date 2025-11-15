const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getAbout, upsertAbout } = require("../controllers/aboutController");

router.get("/", getAbout);
router.post("/save", auth, upsertAbout);

module.exports = router;
