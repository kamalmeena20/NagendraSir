const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  instituteName: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.models.About || mongoose.model("About", AboutSchema);
