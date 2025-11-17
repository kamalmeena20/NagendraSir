const Reading = require("../models/Reading");

// ADD
exports.addReading = async (req, res) => {
  try {
    const reading = new Reading(req.body);
    await reading.save();
    res.status(201).json({ message: "Reading added", data: reading });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const list = await Reading.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateReading = async (req, res) => {
  try {
    const updated = await Reading.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteReading = async (req, res) => {
  try {
    await Reading.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
