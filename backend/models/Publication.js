
const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema({
  thumbnailUrl: { type: String, required: true },   // paper image
  title: { type: String, required: true },          // paper title
  authors: { type: String, required: true },        // authors
  journal: { type: String, required: true },        // journal info
  paperLink: { type: String, required: true },      // clickable link
  orderIndex: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Publication", PublicationSchema);
