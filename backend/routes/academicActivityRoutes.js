const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/academicActivityController");

// Public
router.get("/", getActivities);
router.get("/:id", getActivity);

// Admin
router.post("/", auth, createActivity);
router.put("/:id", auth, updateActivity);
router.delete("/:id", auth, deleteActivity);

module.exports = router;