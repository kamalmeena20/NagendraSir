// const mongoose = require('mongoose');

// const ReadingSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   linkUrl: { type: String, required: true },
//   category: { type: String }, 
//   orderIndex: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model('Reading', ReadingSchema);

const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  linkUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Reading', ReadingSchema);
