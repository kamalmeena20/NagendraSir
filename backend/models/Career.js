const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["phd", "pdrf", "btech_mtech", "internship"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);
