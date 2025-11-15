const Contact = require('../models/Contact');

// Create OR Update Contact Info
exports.saveContact = async (req, res) => {
  try {
    const data = req.body;

    const contact = await Contact.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    res.json({ message: "Contact info saved", data: contact });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Contact Info (Public)
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
