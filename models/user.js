const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    // MongoDB has automatically creates a _id field for each

    email: {
        type: String,
        required: true,
        unique: 'Email already exists',
        match: [/.+|@.+\..+/, 'Please use a valid email address']
    },

    username: {
        type: String,
        required: true,
        unique: 'Username already exists'
    },

    password: {
        type: String,
        required: true
    },

    is_Email_Verified: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

//middleware to hash password
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        console.log('fick');
        return next();
    }
    try
    {
        this.password = await bcrypt.hash(this.password, 10);
        console.log('why dont work?');
        next();
    } catch (error){
        next(error);
    }

});

module.exports = user = mongoose.model("user", UserSchema);

