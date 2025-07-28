const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInventoryItemSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    shopItemId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    isEquipped: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

UserInventoryItemSchema.index(
  { isEquipped: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isEquipped: true,
    },
  }
);

// We can add this below and remove the top one if we have more than just colors in the shop.
// We'll have to define different 'slots' where things can be equipped in order to allow only one item of each type to be equipped.
/*
UserInventoryItemSchema.index(
    { userID: 1, 'instanceProperties.equippedSlot': 1, isEquipped: 1 },
    { unique: true, partialFilterExpression: { isEquipped: true, 'instanceProperties.equippedSlot': { $exists: true } } }
);
*/

module.exports = mongoose.model('userInventory', UserInventoryItemSchema, 'userInventories');