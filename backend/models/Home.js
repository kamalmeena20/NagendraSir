const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  heroImage: { type: String, default: "" },
  secondImage: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Home", HomeSchema);
