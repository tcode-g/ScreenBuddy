const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const User = require("../models/user.js");
const { ShopItem } = require("../models/shop.js");
const UserInventoryItem = require('../models/userInventory'); 

router.post("/buy", auth, async (req, res, next) => {
  try {
    const { itemID } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user."});
    }
    
    const shopItem = await ShopItem.findById(itemID);
    if (!shopItem) {
        return res.status(404).json({ message: 'Shop item not found.' });
    }

        
    if (user.coins < shopItem.price) {
        return res.status(400).json({ message: 'Insufficient coins.' });
    }
    
    const existingInventoryItem = await UserInventoryItem.findOne({
        userID: user._id,
        shopItemId: shopItem._id
    });

    if(existingInventoryItem) {
        return res.status(400).json({ message: 'You already own this item.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $inc: { coins: -shopItem.price } },
        { new: true, runValidators: true } // `new: true` returns the updated doc, `runValidators` ensures `min:0` on coins
    );

    if (!updatedUser) {
        return res.status(500).json({ message: 'Failed to update user coins.' });
    }
    if (updatedUser.coins < 0) {
        // This should never run, but put it for safety purposes
        throw new Error("Transaction failed: Negative balance detected.");
    }

    
    let inventoryItem;
    
    inventoryItem = await UserInventoryItem.create({
        userID: user._id,
        shopItemId: shopItem._id,
    });

    res.status(200).json({
            message: `${shopItem.name} purchased successfully!`,
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                coins: updatedUser.coins
            },
            purchasedItem: inventoryItem
        });
  } catch (error) {
    console.error("Error buying item:", error);
    res.status(500).json({
      message: "An error occurred while buying item.",
    });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const items = await ShopItem.find({});
    res.status(200).json({ message: "Shop items fetched successfully.", items: items });
  } catch (error) {
    console.error("Error fetching shop items:", error);
    res.status(500).json({ message: "An error occurred while fetching shop items." });
  }
});