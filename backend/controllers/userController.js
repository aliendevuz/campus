const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getDashboard = async (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}`,
    stats: {
      courses: 5,
      completedTasks: 12,
      attendance: "92%",
      level: "Student"
    }
  });
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
      });
    } else {
      res.status(404).json({
        message: "User not found"
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getDashboard,
  getProfile,
  updateProfile
};