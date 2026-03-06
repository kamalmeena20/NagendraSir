
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dporfviez",
//   api_key: "285799439492697",
//   api_secret: "pX1IMMK4d6t1GFLDI4zTXs01fqE",
// });

// module.exports = cloudinary;


const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

console.log("Cloud:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Key:", process.env.CLOUDINARY_API_KEY);
console.log("Secret:", process.env.CLOUDINARY_API_SECRET);