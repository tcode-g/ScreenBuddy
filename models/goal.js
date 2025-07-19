const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    // MongoDB has automatically creates a _id field for each

    userID: {
        type: ObjectId,
        required: true
    },

    targetMinutes: {
        type: Number,
        required: true
    },

    isActive: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});


// Only allows one goal to have isActive be true
GoalSchema.index(
  { isActive: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isActive: true,
    },
  }
);

const Goal = mongoose.model('goal', GoalSchema, 'goals');

module.exports = Goal;