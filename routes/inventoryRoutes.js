const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const User = require("../models/user.js");
const UserInventoryItem = require('../models/userInventory'); 

router.post("/equip", auth, async (req, res) => {
  try {
    

    res.status(200).json({ message: "Item equipped successfully." });
  } catch (error) {
    console.error("Error equipping item:", error);
    res.status(500).json({ message: "An error occurred while equipping an item." });
  }
});

router.get("/all", auth, async (req, res) => {
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