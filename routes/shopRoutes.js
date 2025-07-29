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

router.get("/shop", auth, async (req, res) => {
  try {
    const items = await ShopItem.find({});
    res.status(200).json({ message: "Shop items fetched successfully.", items: items });
  } catch (error) {
    console.error("Error fetching shop items:", error);
    res.status(500).json({ message: "An error occurred while fetching shop items." });
  }
});

// single use api to populate shop items database
router.get("/populate", async (req, res) => {
  try {
    const items = [
      { name: 'triangleBlack', price: 100 }, 
      { name: 'triangleBlue', price: 100 },
      { name: 'triangleGreen', price: 100 },
      { name: 'triangleOrange', price: 100 },
      { name: 'trianglePink', price: 100 },
      { name: 'triangleRed', price: 100 },
      { name: 'triangleWhite', price: 100 }, 

      { name: 'squareBlack', price: 250 },
      { name: 'squareBlue', price: 250 },
      { name: 'squareGreen', price: 250 },
      { name: 'squareOrange', price: 250 },
      { name: 'squarePink', price: 250 },
      { name: 'squareRed', price: 250 },
      { name: 'squareWhite', price: 250 },

      { name: 'pentagonBlack', price: 500 },
      { name: 'pentagonBlue', price: 500 },
      { name: 'pentagonGreen', price: 500 },
      { name: 'pentagonOrange', price: 500 },
      { name: 'pentagonPink', price: 500 },
      { name: 'pentagonRed', price: 500 },
      { name: 'pentagonWhite', price: 500 },

      { name: 'hexagonBlack', price: 1000 },
      { name: 'hexagonBlue', price: 1000 },
      { name: 'hexagonGreen', price: 1000 },
      { name: 'hexagonOrange', price: 1000 },
      { name: 'hexagonPink', price: 1000 },
      { name: 'hexagonRed', price: 1000 },
      { name: 'hexagonWhite', price: 1000 },

      { name: 'circleBlack', price: 2000 },
      { name: 'circleBlue', price: 2000 },
      { name: 'circleGreen', price: 2000 },
      { name: 'circleOrange', price: 2000 },
      { name: 'circlePink', price: 2000 },
      { name: 'circleRed', price: 2000 },
      { name: 'circleWhite', price: 2000 }
    ];

    const data = await ShopItem.insertMany(items);
    res.status(200).json({ message: "Shop items added successfully.", items: items });


  } catch (error) {
    console.error("error has occured", error);
    res.status(500).json({message: "An error has occured" , "error": error });
  }
})

module.export = router;