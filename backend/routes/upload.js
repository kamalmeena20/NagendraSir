
// const express = require("express");
// const router = express.Router();
// const cloudinary = require("../utils/cloudinary");
// const multer = require("multer");
// const auth = require("../middleware/authMiddleware");

// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/image", auth, upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

//     const result = await cloudinary.uploader.upload(base64, {
//       folder: "team_images",
//     });

//     res.json({ url: result.secure_url });

//   } catch (err) {
//     console.error("UPLOAD ERROR:", err);
//     res.status(500).json({ message: "Upload failed", error: err.toString() });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const streamifier = require("streamifier");
const auth = require("../middleware/authMiddleware");

// Max 20MB upload limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post("/image", auth, upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload stream to cloudinary
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "gallery_images", // change folder if needed
            resource_type: "image"
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (err) {

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Image too large. Max 20MB allowed." });
    }

    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed", error: err.toString() });
  }
});

module.exports = router;