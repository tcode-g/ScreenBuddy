const mongoose = require("mongoose");
const Goal = require("./goal");
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    // MongoDB has automatically creates a _id field for each

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    goalID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    event: {
      type: String,
      required: true,
      enum: ["screen_on", "screen_off"],
    },

    durationMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },

    goalMet: {
      type: Boolean,
      default: false,
    },

    xpEarned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

LogSchema.statics.createLogEntry = function(userID, goalID, event, durationMinutes, timestamp = new Date()) {
  console.log("Creating log entry:", {
    userID,
    goalID,
    event,
    durationMinutes,
    timestamp,
  });
  return this.create({
    userID,
    goalID,
    date: timestamp,
    event,
    durationMinutes,
  });
};

// LogSchema.pre('save', async function(next) {
//   try {
//     const activeGoal = await Goal.findOne({ _id: goalID });

//     if (activeGoal && this.durationMinutes <= activeGoal.targetDuration) {
//       this.goalMet = true;
//     } else {
//       this.goalMet = false;
//     }
//     next(); 
//   } catch (error) {
//     console.error("Error in pre-save:", error);
//     next(error); 
//   }
// });



const Log = mongoose.model('log', LogSchema, 'logs');

module.exports = Log;