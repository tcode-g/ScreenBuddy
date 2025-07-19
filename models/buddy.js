const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuddySchema = new Schema(
  {
    // MongoDB has automatically creates a _id field for each

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    level: {
      type: Number,
      default: 1,
      min: 1,
    },

    xp: {
      type: Number,
      default: 0,
      min: 0,
    },

    xpToNextLevel: {
      type: Number,
      default: 10,
      min: 0,
    },
  },
  { timestamps: true }
);

const Buddy = mongoose.model('buddy', BuddySchema, 'buddies');

module.exports = Buddy;