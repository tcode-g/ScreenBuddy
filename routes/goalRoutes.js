const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const User = require("../models/user.js");
const Goal = require("../models/goal.js");


router.post("/create", auth, async (req, res) => {
  try {
    const { title, minutes } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const newGoal = new Goal({
      userID: user._id,
      title,
      targetMinutes: minutes,
      isActive: false
    });

    await newGoal.save();
    res.status(201).json({ message: "Goal created successfully.", goal: newGoal });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ message: "An error occurred while creating the goal." });
  }
});

// this doesnt really make sense if name has spaces it would be weird
// also no point in having a name if you can just use the ID
router.get("/status/:name", auth, async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const goal = await Goal.findOne({ userID: user._id, title: name });
    if (!goal) {
      return res.status(400).json({ message: "Goal not found." });
    }

    res.status(200).json({ message: "Goal status fetched successfully.", goal: goal });
  } catch (error) {
    console.error("Error fetching goal status:", error);
    res.status(500).json({ message: "An error occurred while fetching the goal status." });
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    const { goalId, activeStatus } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const goal = await Goal.findOne({ _id: goalId, userID: user._id });
    if (!goal) {
      return res.status(400).json({ message: "Goal not found." });
    }

    goal.isActive = activeStatus; // toggle active status
    await goal.save();

    res.status(200).json({ message: "Goal updated successfully.", goal: goal });
  } catch (error) {
    console.error("Error updating goal:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the goal." });
  }
});
    


router.get("/all", auth, async (req, res) => { 
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    } 

    const goals = await Goal.find({ userID: user._id });
    res.status(200).json({ message: "Goals fetched successfully.", goals: goals });
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ message: "An error occurred while fetching goals." });
  }
});

router.get("/active", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const activeGoal = await Goal.findOne({ userID: user._id, isActive: true });
    if (!activeGoal) {
      return res.status(400).json({ message: "No active goal found." });
    }

    res.status(200).json({ message: "Active goal fetched successfully.", goal: activeGoal });
  } catch (error) {
    console.error("Error fetching active goal:", error);
    res.status(500).json({ message: "An error occurred while fetching the active goal." });
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    const { goalId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const goal = await Goal.findOneAndDelete({ _id: goalId, userID: user._id });
    if (!goal) {
      return res.status(400).json({ message: "Goal not found." });
    }

    res.status(200).json({ message: "Goal removed successfully." });
  } catch (error) {
    console.error("Error removing goal:", error);
    res.status(500).json({ message: "An error occurred while removing the goal." });
  }
});

module.exports = router;