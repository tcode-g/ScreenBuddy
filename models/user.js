const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    UserId: {
        type: Number
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

module.exports = user = mongoose.model("user", UserSchema);

