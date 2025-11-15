
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    designation: String,
    imageUrl: String,
    shortBio: String,
    longBio: String,

    education: [String],
    experience: [String],
    teaching: [String],
    recognition: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
