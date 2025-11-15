// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const Publication = require("../models/Publication");
const Team = require("../models/Team");
const Gallery = require("../models/Gallery");
const Collaborator = require("../models/Collaborator");
const Notification = require("../models/Notification");
const User = require("../models/User"); // your user model (to fetch lastLogin). adjust name if different

router.get("/dashboard", auth, async (req, res) => {
  try {
    const [publications, team, gallery, collaborators] = await Promise.all([
      Publication.countDocuments(),
      Team.countDocuments(),
      Gallery.countDocuments(),
      (await (require("../models/Collaborator").countDocuments())),
    ]);

    // fetch last login info for current user (req.user from auth middleware)
    let lastLogin = null, lastIp = null, device = null, userInfo = null;
    try {
      const u = await User.findById(req.user.id).select("name lastLogin lastIp device email");
      if (u) {
        userInfo = u;
        lastLogin = u.lastLogin;
        lastIp = u.lastIp;
        device = u.device;
      }
    } catch (err) {
      // ignore if no user model or fields not present
    }

    // unread notifications count
    const unread = await Notification.countDocuments({ read: false });

    res.json({
      counts: {
        publications,
        team,
        gallery,
        collaborators
      },
      notifications: { unread },
      lastLogin,
      lastIp,
      device,
      user: userInfo || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
