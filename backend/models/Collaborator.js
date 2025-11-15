const mongoose = require('mongoose');

const CollaboratorSchema = new mongoose.Schema({
  logoUrl: { type: String },
  instituteName: { type: String, required: true },
  collaborators: [{ type: String }],
  orderIndex: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
