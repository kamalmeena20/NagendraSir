// const Reading = require('../models/Reading');

// // Add reading
// exports.addReading = async (req, res) => {
//   try {
//     const { title, description, linkUrl, category, orderIndex } = req.body;
    
//     const newReading = new Reading({
//       title,
//       description,
//       linkUrl,
//       category,
//       orderIndex,
//     });

//     await newReading.save();
//     res.status(201).json({ message: 'Reading added', data: newReading });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Get all readings
// exports.getReadings = async (req, res) => {
//   try {
//     const readings = await Reading.find().sort({ orderIndex: -1 });
//     res.json(readings);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Update reading
// exports.updateReading = async (req, res) => {
//   try {
//     const updated = await Reading.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({ message: 'Reading updated', data: updated });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Delete reading
// exports.deleteReading = async (req, res) => {
//   try {
//     await Reading.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Reading deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


const Reading = require('../models/Reading');

exports.addReading = async (req, res) => {
  try {
    const { title, description, linkUrl } = req.body;

    const newReading = new Reading({
      title,
      description,
      linkUrl,
    });

    await newReading.save();
    res.status(201).json({ message: 'Reading added', data: newReading });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getReadings = async (req, res) => {
  try {
    const readings = await Reading.find().sort({ createdAt: -1 });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateReading = async (req, res) => {
  try {
    const updated = await Reading.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: 'Reading updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteReading = async (req, res) => {
  try {
    await Reading.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reading deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
