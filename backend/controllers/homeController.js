const Home = require("../models/Home");

// CREATE or UPDATE HOME SECTION
exports.upsertHome = async (req, res) => {
  try {
    const data = req.body;

    const home = await Home.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    res.json({ message: "Home updated", data: home });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// GET HOME DATA
exports.getHome = async (req, res) => {
  try {
    let home = await Home.findOne();

    if (!home) {
      home = {
        title: "",
        description: "",
        heroImage: "",
        secondImage: ""
      };
    }

    res.json(home);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
