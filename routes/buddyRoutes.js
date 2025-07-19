const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const User = require("../models/user.js");
const Buddy = require("../models/buddy.js");

router.post("/buy", auth, async (req, res, next) => {
  try {
    const { buddyId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user."});
    }
    
    // find buddy by ID

    // check if buddy already exists

    // check if user has enough points

    // buy the buddy

    return res.status(200).json({
      message: "Buddy bought successfully.",
      buddy: buddyId,
    });
    
  } catch (error) {
    console.error("Error fetching buddies:", error);
    res.status(500).json({
      message: "An error occurred while fetching buddies.",
    });
  }
});
router.post("/equip", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const { buddyId } = req.body;
    // check if buddy exists

    // check if buddy is owned by user

    // unequip current buddy if any

    // equip the new buddy

    return res.status(200).json({
      message: "Buddy equipped successfully.",
      buddy: buddyId,
    });
    
  } catch (error) {
    console.error("Error fetching buddies:", error);
    res.status(500).json({
      message: "An error occurred while fetching buddies.",
    });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const buddies = await Buddy.find({ userID: user._id });
    res.status(200).json({ message: "Buddies fetched successfully.", buddies: buddies });
  } catch (error) {
    console.error("Error fetching buddies:", error);
    res.status(500).json({ message: "An error occurred while fetching buddies." });
  }
});


module.exports = router;
