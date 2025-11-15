
const Profile = require("../models/Profile");

// Create or update profile (single profile)
exports.upsertProfile = async (req, res) => {
  try {
    const data = req.body;

    const profile = await Profile.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    res.json({ message: "Profile saved", data: profile });
  } catch (error) {
    console.error("PROFILE SAVE ERROR:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get profile (public)
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
