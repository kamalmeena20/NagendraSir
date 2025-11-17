const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/readingController");
const auth = require("../middleware/authMiddleware");

// Admin operations
router.post("/", auth, ctrl.addReading);
router.put("/:id", auth, ctrl.updateReading);
router.delete("/:id", auth, ctrl.deleteReading);

// Public
router.get("/", ctrl.getAll);

module.exports = router;
