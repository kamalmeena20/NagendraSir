
// const Team = require('../models/Team');

// // Add member
// exports.addMember = async (req, res) => {
//   try {
//     const { name, imageUrl, role, department, email, orderIndex } = req.body;

//     const newMember = new Team({
//       name,
//       imageUrl,
//       role,          // FIXED HERE
//       department,
//       email,
//       orderIndex,
//     });

//     await newMember.save();
//     res.status(201).json({ message: 'Team member added', data: newMember });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// // Get all members
// exports.getMembers = async (req, res) => {
//   try {
//     const members = await Team.find().sort({ orderIndex: -1 });
//     res.json(members);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// // Update
// exports.updateMember = async (req, res) => {
//   try {
//     const updated = await Team.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json({ message: 'Team member updated', data: updated });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// // Delete
// exports.deleteMember = async (req, res) => {
//   try {
//     await Team.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Team member deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };


const Team = require('../models/Team');

// Add member
exports.addMember = async (req, res) => {
  try {
    const { name, role, imageUrl, department, email, orderIndex } = req.body;

    const newMember = new Team({
      name,
      role,
      imageUrl,
      department,
      email,
      orderIndex
    });

    await newMember.save();

    res.status(201).json({ message: 'Team member added', data: newMember });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({ orderIndex: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update
exports.updateMember = async (req, res) => {
  try {
    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: 'Team member updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete
exports.deleteMember = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
