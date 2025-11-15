const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: { type: String },
  imageUrl: { type: String, required: true },
  event: { type: String },
  orderIndex: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);
