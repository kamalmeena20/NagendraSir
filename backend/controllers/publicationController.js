
const Publication = require("../models/Publication");

// Add Publication
exports.addPublication = async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    res.status(201).json({ message: "Publication added", data: pub });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Publications
exports.getPublications = async (req, res) => {
  try {
    const pubs = await Publication.find().sort({ orderIndex: -1, createdAt: -1 });
    res.json(pubs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Publication
exports.updatePublication = async (req, res) => {
  try {
    const updated = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Publication updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Publication
exports.deletePublication = async (req, res) => {
  try {
    await Publication.findByIdAndDelete(req.params.id);
    res.json({ message: "Publication deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
