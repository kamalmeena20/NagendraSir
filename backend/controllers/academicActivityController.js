const AcademicActivity = require("../models/AcademicActivity");

// GET ALL
exports.getActivities = async (req, res) => {
  try {
    const activities = await AcademicActivity.find().sort({
      startDate: -1,
      orderIndex: 1,
    });

    res.json(activities);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET SINGLE
exports.getActivity = async (req, res) => {
  try {
    const activity = await AcademicActivity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.json(activity);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// CREATE
exports.createActivity = async (req, res) => {
  try {
    const activity = await AcademicActivity.create(req.body);

    res.status(201).json({
      message: "Activity created successfully",
      data: activity,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE
exports.updateActivity = async (req, res) => {
  try {
    const activity = await AcademicActivity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.json({
      message: "Activity updated successfully",
      data: activity,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DELETE
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await AcademicActivity.findByIdAndDelete(
      req.params.id
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.json({
      message: "Activity deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};