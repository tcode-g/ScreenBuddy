const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Goal = require("../models/goal.js");
const Log = require("../models/log.js");
const Buddy = require("../models/buddy.js");
const dailyScreentime = require("../models/dailyScreen.js");


async function saveActivityLog(user, event, eventTimestamp) {
  // This function should save the activity log to the database
  // For now, we will just log it to the console
  console.log(`User: ${user._id}, Event: ${event}, Data: ${eventTimestamp}`);
  
  let currentGoal = await Goal.findOne({ userID: user._id, isActive: true });
  let noActiveGoal = false;
  if (!currentGoal) { // this should never happen  --------just in case create the goal if it doesn't exist
    console.log("No active goal found for user.");
    
    // check for a recent goal that is not active by lastCompletedDate
    currentGoal = await Goal.findOne({ userID: user._id }).sort({
      lastCompletedDate: -1,
    });

    // check if lastCompletedDate is within the last 3 days
    if (currentGoal && currentGoal.lastCompletedDate) {
      // const threeDaysAgo = new Date();
      // threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      // if (currentGoal.lastCompletedDate < threeDaysAgo) {
      //   currentGoal.isActive = true; // set the goal to active
      //   // currentGoal.completedMinutes = 0; // reset completed minutes

      // check if lastCompletedDate wasn't today
      const today = new Date(eventTimestamp);
      const lastCompletedDate = new Date(currentGoal.lastCompletedDate);

      today.setHours(0, 0, 0, 0); // set to
      lastCompletedDate.setHours(0, 0, 0, 0); // set to start of the day

      if (lastCompletedDate.getTime() != today.getTime()) {
        console.log("Recent goal found, activating it.");
        currentGoal.isActive = true; // set the goal to active
        currentGoal.completedMinutes = 0; // reset completed minutes
      } else {
        console.log("No recent goal found for user.");
        currentGoal = await Goal.findOne({ userID: user._id }).sort({ updatedAt: -1 });    
        noActiveGoal = true; // set flag to indicate no active goal found
      }
    } else {
      currentGoal = await Goal.findOne({ userID: user._id }).sort({
        updatedAt: -1,
      });
      noActiveGoal = true; // set flag to indicate no active goal found
    }

    
    // currentGoal = Goal.createDefaultGoal(user._id);
    
    // noActiveGoal = true; // set flag to indicate no active goal found
    
    // currentGoal = new Goal({
      //   userID: user._id,
      //   title: "Default Goal 60 Mins",
      //   targetMinutes: 60, // Default target minutes
      //   completedMinutes: 0,
      //   isActive: true,
      // });
      // currentGoal.save();
      // return;
  }

  // console.log(`Current Goal: ${currentGoal}`);
    
  const logEntry = new Log({
    userID: user._id,
    goalID: currentGoal._id,
    date: eventTimestamp,
    event: event,
    durationMinutes: 0, 
    goalMet: false,
    xpEarned: 0, 
  });
  // console.log(`Log entry created: ${logEntry}`);
  // Get previous log entry
  const previousLog = await Log.findOne({ userID: user._id }).sort({ date: -1 });
  let timeSinceLastLog = previousLog ? (eventTimestamp - previousLog.date) / 60000 : 0; // in minutes

  // timeSinceLastLog *= 60; // this is to inflate the reward for testing purposes


  // log xpEarned
  logEntry.xpEarned = timeSinceLastLog / 5; 
  logEntry.durationMinutes = timeSinceLastLog;

  

  if (event === "screen_off" ) {

    console.log("Screen off for user :", user._id, "Duration:", timeSinceLastLog, "minutes");
    // daily screentime metrics
    // check if (eventTimestamp: Date - timeSinceLastLog: minutes) is the same day
    const startOfEvent = new Date(eventTimestamp);
    startOfEvent.setMinutes(eventTimestamp.getMinutes() - timeSinceLastLog);

    // if startOfEvent isn't the same day as today, update previous day's screentime
    const startOfToday = new Date(eventTimestamp);
    startOfToday.setHours(0, 0, 0, 0);

    if (startOfEvent.getTime() < startOfToday.getTime()) {
      console.log("Updating screentime for previous day:", startOfEvent);
      // some of event time happened yesterday
      // get only the time that happened yesterday in minutes
      const yesterdayDuration = Math.floor(
        (startOfToday.getTime() - startOfEvent.getTime()) / 60000
      );
      // update yesterday's screentime

      const yesterday = new Date(startOfEvent);
      yesterday.setHours(0, 0, 0, 0);

      // update yesterdays screentime regardless if theres an entry or not
      await dailyScreentime.findOneAndUpdate(
        { userID: user._id, date: yesterday },
        { $inc: { duration: yesterdayDuration } },
        { upsert: true, new: true }
      );

      timeSinceLastLog -= yesterdayDuration; // reduce the time since last log by the yesterday's duration

    }
    // update today's screentime
    await dailyScreentime.findOneAndUpdate(
      { userID: user._id, date: startOfToday },
      { $inc: { duration: timeSinceLastLog } },
      { upsert: true, new: true }
    );

    console.log("Screen off logged for user:", user._id, "Duration:", timeSinceLastLog, "minutes");

    logEntry.save(); // save log entry
    return;
  }

  if (noActiveGoal) {
    logEntry.save();

    return;
  }

  if (!previousLog || previousLog.event === event) {
    console.log("No previous log or same event, skipping update.");
    logEntry.save(); // save log entry
    // if the previous log is the same event (screen_on), don't update
    return;
  }



  // update the current goal's completed minutes
  // currentGoal.completedMinutes += logEntry.durationMinutes;
  currentGoal.completedMinutes += timeSinceLastLog;
  if (currentGoal.completedMinutes >= currentGoal.targetMinutes) {
    currentGoal.isActive = false; // deactivate the goal if target is met
    currentGoal.lastCompletedDate = eventTimestamp; // set last met date
    logEntry.goalMet = true; // mark the log entry as goal met
    user.coins += currentGoal.targetMinutes; // reward user with coins
    user.save(); // save user coins
  }
  logEntry.save();
  currentGoal.save(); // save goal changes


  // Get the buddy and update the XP
  const buddy = await Buddy.findOne({ userID: user._id, isEquipped: true });
  if (!buddy) { // this should never happen, should always have a buddy equipped
    console.log("No equipped buddy found for user.");
    return;
  }

  buddy.xp += logEntry.xpEarned;
  if (buddy.xp >= buddy.xpToLevelUp) {
    buddy.xp = 0;
    buddy.level += 1;
    buddy.xpToLevelUp = Math.floor(buddy.xpToLevelUp * 1.5); // Increase XP needed for next level
  }

  buddy.save(); // save buddy changes
  console.log(`Activity logged for user: ${user._id}, Event: ${event}, Duration: ${logEntry.durationMinutes} minutes, XP Earned: ${logEntry.xpEarned}`);
}
function doActivityMetrics(userId) {
  // This function should process the activity data for metrics
  // For now, we will just log it to the console
  console.log(`Processing metrics for user: ${userId}`);
}

router.post("/add", async (req, res) => {
  try {
    // event = "screen_on" or "screen_off"
    const {event} = req.body;
    const timestamp = new Date();
    if (!event) {
      return res.status(400).json({ message: "Event and activity data are required." });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user." });
    }


    // save the activity log
    await saveActivityLog(user, event, timestamp);
    res.status(200).json({ message: "Activity logged successfully." });
    // do something with the activity data, something with metrics
    doActivityMetrics(user._id);

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
      await saveActivityLog(user._id, activity.event, activity.activityData);
    }
    doActivityMetrics(user._id);

    return res.status(200).json({ message: "Activities logged successfully." });
  } catch (error) {
    console.error("Error logging bulk activities:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});



module.exports = router;