const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Metrics = require("../models/metrics.js");

router.get("/screentime", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // find the last 7 days of screen time data
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    lastWeek.setHours(0, 0, 0, 0);

    const screenTimeData = await Metrics.find({
      userID: user._id,
      date: { $gte: lastWeek, $lte: today }
    }).sort({ date: -1 });

    const result = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const dateString = date.toISOString();
      result[dateString] = 0;
    }
    screenTimeData.forEach(entry => {
      const dateString = entry.date.toISOString();
      result[dateString] = entry.duration || 0;
    });

    res.status(200).json({
      message: "Screen time data fetched successfully.",
      screentime: result
    });

    

    // if (screenTimeData.length === 0) {
    //   return res.status(404).json({ message: "No screen time data found for the last 7 days." });
    // }

    // res.status(200).json({
    //   message: "Screen time data fetched successfully.",
    //   screenTimeData: screenTimeData
    // });
    
  } catch (error) {
    console.error("Error fetching screen time:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/weeklygoals", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    lastWeek.setHours(0, 0, 0, 0);

    const screenTimeData = await Metrics.find({
      userID: user._id,
      date: { $gte: lastWeek, $lte: today }
    }).sort({ date: -1 });

    const result = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const dateString = date.toISOString();
      result[dateString] = 0;
    }
    screenTimeData.forEach(entry => {
      const dateString = entry.date.toISOString();
      result[dateString] = entry.goalsCompleted || 0;
    });

    res.status(200).json({
      message: "Weekly goals data fetched successfully.",
      weeklyGoals: result
    });

  } catch (error) {
    console.error("Error fetching goals:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;