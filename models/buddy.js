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
      type: mongoose.Schema.Types.Double,
      default: 0,
      min: 0,
    },

    xpToLevelUp: {
      type: Number,
      default: 100,
      min: 0,
    },

    isEquipped: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Only allows one buddy to be equipped
BuddySchema.index(
  { isEquipped: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isEquipped: true,
    },
  }
);

BuddySchema.statics.createBuddy = function(userID, name, equipped = false) {
  return this.create({
    userID,
    name,
    level: 1,
    xp: 0,
    isEquipped: equipped,
  });
};
BuddySchema.statics.createDefaultBuddy = function(userID, name = "BuddyO'Pal") {
  return this.createBuddy(userID, name, true);
};

const Buddy = mongoose.model('buddy', BuddySchema, 'buddies');

module.exports = Buddy;