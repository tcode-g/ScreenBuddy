require('express');
require('mongodb');
const User = require("./models/user.js");

exports.setApp = function(app, client)
{   
    app.post('/api/register', async (req, res, next) =>
    {
        try {
            const {email, username, password} = req.body;
            if (!email || !username || !password) {
                // making sure not empty string, add more verification later.
                return res.status(400).json({ message: "Email, username, and password are required." });
            }
            const newUser = new User({email:email, username:username, password:password});

            // TODO: Check if user exists

            // TODO: Password hashing

            await newUser.save();
            
            res.status(201).json({
                message: "User registered successfully!",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
            });
        }
        catch (error) {
            console.error("Error during register:", error);
            res.status(500).json({ message: "An error occurred." });
        }
    });

    app.post('/api/login', async (req, res, next) => 
    {
        try {
            // incoming: login, password
            // outgoing: id, firstName, lastName, error

            const { username, password } = req.body;

            if (!username || !password) {
                // making sure not empty string, add more verification later.
                return res.status(400).json({ message: "Username and password are required." });
            }

            const user = await User.findOne({ username: username, password: password });
            
            // Maybe add verified flag to users in usersCollection? If true allow login, else don't. Verification done through email. 
            if (user) {
                // JWT generated here?
                res.status(200).json({ message: "Login successful!", user: { id: user._id, email: user.email } });
            } else {
                res.status(401).json({ message: "Invalid username or password." });
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "An error occurred." });
        }
    });
}