const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    profileImage: String,
    name: String,
    designation: String,
    department: String,
    institute: String,

    biography: String,

    professionalExperience: [String],
    education: [String],
    teaching: [String],
    recognition: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
