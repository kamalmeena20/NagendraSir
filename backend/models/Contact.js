const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  
  // Profile Info
  photoUrl: { type: String },          // Sir image
  name: { type: String },              // Sir name
  profession: { type: String },        // Sir designation
  
  // Department
  department: { type: String },

  // Emails
  emailPrimary: { type: String },
  emailSecondary: { type: String },

  // Address
  addressLine1: { type: String },      // Example: Sector-28
  city: { type: String },              // Gandhinagar
  state: { type: String },             // Gujarat
  pincode: { type: String },           // 382028
  landmark: { type: String },          // Near IITV or any landmark

}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
