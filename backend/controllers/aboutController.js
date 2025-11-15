const About = require("../models/About");

// Get About
exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        instituteName: "",
        description: "",
        image: ""
      });
    }

    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Save / Update About
exports.upsertAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(req.body);
    } else {
      await About.updateOne({}, req.body);
    }

    res.json({ message: "About updated", data: req.body });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
