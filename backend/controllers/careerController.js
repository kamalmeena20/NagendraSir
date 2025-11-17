const Career = require("../models/Career");

// ADD NEW CAREER OPTION
exports.addCareer = async (req, res) => {
  try {
    const { category, title, description } = req.body;

    if (!category || !title || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    const item = new Career({ category, title, description });
    await item.save();

    res.status(201).json({ message: "Career added successfully", data: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const list = await Career.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteCareer = async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const updated = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
