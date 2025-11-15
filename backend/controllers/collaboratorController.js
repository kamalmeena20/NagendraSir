const Collaborator = require('../models/Collaborator');

// Add institute
exports.addInstitute = async (req, res) => {
  try {
    const { logoUrl, instituteName, collaborators, orderIndex } = req.body;

    const newItem = new Collaborator({
      logoUrl,
      instituteName,
      collaborators,
      orderIndex
    });

    await newItem.save();
    res.json({ message: "Institute added", data: newItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all
exports.getInstitutes = async (req, res) => {
  try {
    const all = await Collaborator.find().sort({ orderIndex: -1 });
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update
exports.updateInstitute = async (req, res) => {
  try {
    const updated = await Collaborator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Institute updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete
exports.deleteInstitute = async (req, res) => {
  try {
    await Collaborator.findByIdAndDelete(req.params.id);
    res.json({ message: "Institute deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
