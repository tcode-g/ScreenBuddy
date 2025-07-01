require('express');
require('mongodb');
const auth = require('./middleware/auth.js');
const user = require('./models/user.js');
const User = require("./models/user.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

            const user = await User.findOne({ username: username});
            
            // Maybe add verified flag to users in usersCollection? If true allow login, else don't. Verification done through email. 
            if (user) {
                const checkPassword = await bcrypt.compare(password, user.password);
                if(checkPassword){
                    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET || 'defaultsecret', {expiresIn: '1h'});
                    res.status(200).json({ message: "Login successful!", token, user: { id: user._id, email: user.email } })
                } else {
                   return res.status(401).json({ message: "Invalid username or password.", user: {id: -1, email: ''} });
                }    
            } else {
              return res.status(401).json({ message: "Invalid username or password.", user: {id: -1, email: ''} });
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "An error occurred." });
        }
    });

    app.get('/api/profile/:id', auth, async (req, res, next) =>
    {
        try {
            
            
            

           const user = await User.findById(req.params.id).select('-password');
            
            res.status(201).json({
                message: "User found",
                user: {
                    name: user.username,
                    created: user.createdAt
                }
            });
        }
        catch (error) {
            console.error("Error during fetch:", error);
            res.status(500).json({ message: "An error occurred." });
        }
    });

}