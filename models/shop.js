const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOptions = {
  discriminatorKey: 'type', // This is the field that will store the item's type
  collection: 'shop_items', // All items will be in this single collection
  timestamps: true
};

const ShopItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
}, baseOptions);

const ShopItem = mongoose.model('ShopItem', ShopItemSchema);

// I don't know what is going on in this regex so don't ask, just know it makes sure color format is rgb(R,G,B) or rgba(R,G,B,A).
const colorRegex = /^rgb(?:a)?\(\s*(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9]))\s*,\s*(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9]))\s*,\s*(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9]))(?:\s*,\s*(?:(?:1(?:\.0)?|0(?:\.[0-9]+)?)))?\s*\)$/;

const ColorSchema = new Schema({
    color: {
        type: String,
        match: [colorRegex, 'Invalid color format. Please use rgb(R,G,B) or rgba(R,G,B,A).']
    },
});
ShopItem.discriminator('Color', ColorSchema); 

// We can add more types of items do the shop by using a discriminator like the ColorSchema above

module.exports = {
    ShopItem,
    Color: mongoose.model('Color'), // Export the discriminator models
};

const Shop = mongoose.model('shopItem', ShopItemSchema);
module.exports = Shop;
