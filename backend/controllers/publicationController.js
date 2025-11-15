// // const Publication = require('../models/Publication');

// // // Add Publication
// // exports.addPublication = async (req, res) => {
// //   try {
// //     const { title, authors, year, thumbnailUrl, linkUrl, citation, orderIndex } = req.body;

// //     const newPub = new Publication({
// //       title,
// //       authors,
// //       year,
// //       thumbnailUrl,
// //       linkUrl,
// //       citation,
// //       orderIndex
// //     });

// //     await newPub.save();
// //     res.status(201).json({ message: 'Publication added successfully', data: newPub });

// //   } catch (error) {
// //     console.error('Add Publication Error:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // };


// // // Get All Publications
// // exports.getPublications = async (req, res) => {
// //   try {
// //     const pubs = await Publication.find().sort({ orderIndex: -1, createdAt: -1 });
// //     res.json(pubs);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // };


// // // Update Publication
// // exports.updatePublication = async (req, res) => {
// //   try {
// //     const updatedPub = await Publication.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );

// //     res.json({ message: 'Publication updated', data: updatedPub });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // };


// // // Delete Publication
// // exports.deletePublication = async (req, res) => {
// //   try {
// //     await Publication.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Publication deleted' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // };


// const Publication = require('../models/Publication');

// // Add
// exports.addPublication = async (req, res) => {
//   try {
//     const pub = new Publication(req.body);
//     await pub.save();
//     res.status(201).json({ message: "Publication added", data: pub });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", err });
//   }
// };

// // Get All (sorted)
// exports.getPublications = async (req, res) => {
//   try {
//     const list = await Publication.find().sort({ orderIndex: -1, createdAt: -1 });
//     res.json(list);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", err });
//   }
// };

// // Update
// exports.updatePublication = async (req, res) => {
//   try {
//     const updated = await Publication.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json({ message: "Updated", data: updated });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", err });
//   }
// };

// // Delete
// exports.deletePublication = async (req, res) => {
//   try {
//     await Publication.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", err });
//   }
// };


// const Publication = require("../models/Publication");

// // Add new publication
// exports.addPublication = async (req, res) => {
//   try {
//     const pub = await Publication.create(req.body);
//     res.status(201).json({ message: "Publication added", data: pub });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err });
//   }
// };

// // Get all publications
// exports.getPublications = async (req, res) => {
//   try {
//     const pubs = await Publication.find().sort({ orderIndex: -1, createdAt: -1 });
//     res.json(pubs);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Update
// exports.updatePublication = async (req, res) => {
//   try {
//     const pub = await Publication.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json({ message: "Publication updated", data: pub });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Delete
// exports.deletePublication = async (req, res) => {
//   try {
//     await Publication.findByIdAndDelete(req.params.id);
//     res.json({ message: "Publication deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };


const Publication = require("../models/Publication");

// Add Publication
exports.addPublication = async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    res.status(201).json({ message: "Publication added", data: pub });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Publications
exports.getPublications = async (req, res) => {
  try {
    const pubs = await Publication.find().sort({ orderIndex: -1, createdAt: -1 });
    res.json(pubs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Publication
exports.updatePublication = async (req, res) => {
  try {
    const updated = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Publication updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Publication
exports.deletePublication = async (req, res) => {
  try {
    await Publication.findByIdAndDelete(req.params.id);
    res.json({ message: "Publication deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
