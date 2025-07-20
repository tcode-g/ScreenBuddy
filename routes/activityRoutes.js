const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

function saveActivityLog(userId, event, activityData) {
  // This function should save the activity log to the database
  // For now, we will just log it to the console
  console.log(`User: ${userId}, Event: ${event}, Data: ${activityData}`);
}
function doActivityMetrics(userId) {
  // This function should process the activity data for metrics
  // For now, we will just log it to the console
  console.log(`Processing metrics for user: ${userId}`);
}

router.post("/add", async (req, res) => {
  try {
    // event = "screen_on" or "screen_off"
    // activityData = timestamp
    const {event, activityData} = req.body;
    if (!event || !activityData) {
      return res.status(400).json({ message: "Event and activity data are required." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user." });
    }

    // save the activity log
    saveActivityLog(user._id, event, activityData);
    // do something with the activity data, something with metrics
    doActivityMetrics(user._id);

    return res.status(200).json({ message: "Activity logged successfully." });
  } catch (error) {
    console.error("Error logging activity:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/bulk-add", async (req, res) => {
  try {
    const { activities } = req.body; // activities should be an array of activity objects
    if (!activities || !Array.isArray(activities)) {
      return res.status(400).json({ message: "Activities must be an array." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user." });
    }

    for (const activity of activities) {
      if (!activity.event || !activity.activityData) {
        continue; // skip invalid activity
      }
      saveActivityLog(user._id, activity.event, activity.activityData);
    }
    doActivityMetrics(user._id);

    return res.status(200).json({ message: "Activities logged successfully." });
  } catch (error) {
    console.error("Error logging bulk activities:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});



module.exports = router;