
// const mongoose = require('mongoose');

// const PublicationSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   authors: { type: String, required: true },
//   year: { type: Number, required: true },
  
//   thumbnailUrl: { type: String },        // Cloudinary URL
//   linkUrl: { type: String },             // Paper link
//   citation: { type: String },            // Full citation text

//   orderIndex: { type: Number, default: 0 },
// }, { timestamps: true });

// module.exports = mongoose.model('Publication', PublicationSchema);

// const mongoose = require("mongoose");

// const PublicationSchema = new mongoose.Schema({
//   thumbnailUrl: { type: String, required: true },  // paper image
//   title: { type: String, required: true },
//   authors: { type: String, required: true },
//   journal: { type: String, required: true },
//   paperLink: { type: String, required: true },
//   orderIndex: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model("Publication", PublicationSchema);
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
