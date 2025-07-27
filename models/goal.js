const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    // MongoDB has automatically creates a _id field for each

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    targetMinutes: {
      type: Number,
      required: true,
    },

    completedMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },

    // startTime: { // minutes from start of the day
    //   type: Number,
    //   default: 0,
    // },

    // endTime: { // minutes from start of the day
    //   type: Number,
    //   default: 0,
    // },

    isActive: {
      type: Boolean,
      default: false,
    },
    lastCompletedDate: {
      type: Date,
      default: null,
    },

    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

GoalSchema.statics.createDefaultGoal = function(userID) {
  return this.create({
    userID,
    title: "60 Mins Goal",
    targetMinutes: 60,
    completedMinutes: 0,
    isActive: true
  });
  // return this.create({
  //   userID,
  //   title: "12PM - 1PM Goal",
  //   startTime: 720, // 12 pm (60 * 12 = 720)
  //   endTime: 780, // 1 pm (60 * 13 = 780)
  //   isActive: true
  // });
};

// Only allows one goal to have isActive be true
GoalSchema.index(
  { isActive: 1, userID: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isActive: true,
    },
  }
);

const Goal = mongoose.model('goal', GoalSchema, 'goals');

module.exports = Goal;