const express = require("express");
const router = express.Router();
const careerCtrl = require("../controllers/careerController");
const auth = require("../middleware/authMiddleware");

// Add new
router.post("/", auth, careerCtrl.addCareer);

// Get all
router.get("/", careerCtrl.getAll);

// Update
router.put("/:id", auth, careerCtrl.updateCareer);

// Delete
router.delete("/:id", auth, careerCtrl.deleteCareer);

module.exports = router;
