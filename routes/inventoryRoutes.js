const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const User = require("../models/user.js");
const UserInventoryItem = require('../models/userInventory'); 

router.post("/equip", auth, async (req, res) => {
  try {
    const { itemID } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(400).json({ message: "Invalid user."});
    }

    const itemToEquip = await UserInventoryItem.findOne({
      _id: itemID,
      userId: user._id 
    });

    if (!itemToEquip) {
      return res.status(404).json({ message: "Item not found in your inventory." });
    }

    const currentlyEquippedItem = await UserInventoryItem.findOne({
      userId: userId,
      isEquipped: true
    });

    if (currentlyEquippedItem) {
        currentlyEquippedItem.isEquipped = false;
        await currentlyEquippedItem.save();
    }

    itemToEquip.isEquipped = true;
    await itemToEquip.save();

    res.status(200).json({ message: "Item equipped successfully." });
  } catch (error) {
    console.error("Error equipping item:", error);
    res.status(500).json({ message: "An error occurred while equipping an item." });
  }
});

router.get("/inventory", auth, async (req, res) => {
try {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(400).json({ message: "User not found." });
    }

    const items = await UserInventoryItem.find({ userId: user._id });
    res.status(200).json({ message: "Inventory items fetched successfully.", items: items });
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).json({ message: "An error occurred while fetching inventory items." });
  }
});