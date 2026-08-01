const mongoose = require("mongoose");

const academicActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "Conference",
        "Workshop",
        "Seminar",
        "Invited Talk",
        "Guest Lecture",
        "Symposium",
        "Faculty Development Program",
        "Webinar",
        "Other",
      ],
      required: true,
    },

    role: {
      type: String,
      default: "",
      trim: true,
    },

    organizer: {
      type: String,
      default: "",
      trim: true,
    },

    venue: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    orderIndex: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AcademicActivity",
  academicActivitySchema
);