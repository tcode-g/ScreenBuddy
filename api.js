require('express');
require('mongodb');
const auth = require('./middleware/auth.js');
const User = require("./models/user.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailAcc = 'screenbuddy4331@gmail.com'
const emailPassword = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailAcc, 
        pass: emailPassword
    }
});

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

            await newUser.save();
            
            res.status(201).json({
                message: "User registered successfully!",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
            });

            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
            newUser.emailVerificationCode = verificationCode
            newUser.emailVerificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now

            const mail = {
                from: emailAcc,
                to: email,
                subject: 'Email Verification for Your Account',
                html: `
                    <p>Hello ${username},</p>
                    <p>Thank you for registering with us! To complete your registration, please use the following verification code:</p>
                    <h3>${verificationCode}</h3>
                    <p>This code is valid for a limited time.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Regards,</p>
                    <p>ScreenBuddy</p>
                `
            };

            transporter.sendMail(mail, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Error sending verification email.' });
                }
                console.log('Verification email sent:', info.response);
                res.status(200).json({ message: 'Please check your email for a verification code.' });
            });
        }
        catch (error) {
            console.error("Error during register:", error);
            res.status(500).json({ message: "An error occurred." });
        }
    });

    app.post('/api/verify-email', async (req, res, next) =>
    {
        try {
            const { email, code } = req.body;

            const user = await User.findOne({ email });

            if(!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if(user.isEmailVerified) {
                return res.status(200).json({ message: 'Email is already verified.' });
            }

            if (user.emailVerificationCode === code && user.emailVerificationCodeExpires > new Date()) {
                user.isEmailVerified = true;
                user.emailVerificationCode = undefined;
                emailVerificationCodeExpires = undefined;
                await user.save();

                res.status(200).json({ message: 'Email has been verified.' });
            } else if (user.emailVerificationCodeExpires <= new Date()) {
                user.emailVerificationCode = undefined;
                user.emailVerificationCodeExpires = undefined;
                await user.save();
                
                res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
            } else {
                res.status(400).json({ message: 'Invalid verification code.' });
            }
        }
        catch (error) {
            console.error("Error during email verifcation:", error);
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
            
            if (user) {
                if(!user.isEmailVerified) {
                    return res.status(401).json({ message: "Email not verified.", user: {id: user._id, email: user.email} });
                }

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