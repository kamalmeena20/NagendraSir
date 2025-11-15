const Gallery = require('../models/Gallery');

// Add Image
exports.addImage = async (req, res) => {
  try {
    const { title, imageUrl, event, orderIndex } = req.body;

    const newImage = new Gallery({
      title,
      imageUrl,
      event,
      orderIndex,
    });

    await newImage.save();
    res.status(201).json({ message: 'Image added', data: newImage });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all images
exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ orderIndex: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update
exports.updateImage = async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Image updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete
exports.deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
