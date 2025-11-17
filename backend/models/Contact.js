const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  
  // Profile Info
  photoUrl: { type: String },          
  name: { type: String },            
  profession: { type: String },       
  
  // Department
  department: { type: String },

  // Emails
  emailPrimary: { type: String },
  emailSecondary: { type: String },

  // Address
  addressLine1: { type: String },      
  city: { type: String },             
  state: { type: String },             
  pincode: { type: String },          
  landmark: { type: String },          

}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
