const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },     // FIXED
  imageUrl: { type: String },
  department: { type: String },
  email: { type: String },
  orderIndex: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
