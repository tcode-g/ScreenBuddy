require('express');
require('mongodb');
const auth = require('./middleware/auth.js');
const User = require("./models/user.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailAcc = process.env.EMAIL_ACCOUNT
require('dotenv').config();
const emailPassword = process.env.EMAIL_PASSWORD

const crypto = require('crypto');

function generateSecureRandomToken(length = 32) {
    return crypto.randomBytes(length).toString('base64url');
}

const buddyRoutes = require('./routes/buddyRoutes.js');
const goalRoutes = require('./routes/goalRoutes.js');
const activityRoutes = require('./routes/activityRoutes.js');
const Goal = require('./models/goal.js');
const Log = require('./models/log.js');
const Buddy = require('./models/buddy.js');

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

            // Check if user with this email or username already exists, it crashes otherwise
            const existingUser = await User.findOne({ $or: [ { email }, { username } ] });
            if (existingUser) {
                return res.status(409).json({ message: "A user with this email or username already exists." });
            }

            const newUser = new User({email:email, username:username, password:password, emailVerificationCode: "", emailVerificationCodeExpires: ""});

            
            
            res.status(201).json({
                message: "User registered successfully!",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
            });

            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
            newUser.emailVerificationCode = verificationCode;
            newUser.emailVerificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

            await newUser.save();
            console.log("step1");
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
                console.log(info.response);
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Error sending verification email.' });
                }
                console.log('Verification email sent:', info.response);
                console.log(mail);
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
                user.emailVerificationCodeExpires = undefined;
                await user.save();

                res.status(200).json({ message: 'Email has been verified.' });

                // email verified, create default goal, buddy, and log
                const defaultGoal = Goal.createDefaultGoal(user._id);
                const defaultBuddy = Buddy.createDefaultBuddy(user._id);

                defaultGoal.save();
                defaultBuddy.save();

                const defaultLog = Log.createLogEntry(
                    user._id,
                    defaultGoal._id,
                    "screen_on",
                    0
                );
                // defaultLog.save();


                // Promise.all([defaultGoal, defaultBuddy])
                // .then(([goal, buddy]) => {
                //     return Promise.all([
                //         goal.save(),
                //         buddy.save()
                //     ]).then(([savedGoal, savedBuddy]) => {
                //         // Now save the log with the saved goal's _id
                //         const defaultLog = Log.createLogEntry(
                //           user._id,
                //           savedGoal._id,
                //           "screen_on",
                //           0
                //         );
                //         // return defaultLog.save();
                //     });
                // })
                // .then(() => {
                //     console.log("Default goal, buddy, and log created and saved successfully.");
                // })
                // .catch(err => {
                //     console.error("Error creating or saving default objects:", err);
                // });
            } else if (user.emailVerificationCodeExpires <= new Date()) {
                user.emailVerificationCode = undefined;
                user.emailVerificationCodeExpires = undefined;
                await user.save();

                
                res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
            } else {
                res.status(400).json({ message: 'Invalid verification code.'});
            }
        }
        catch (error) {
            console.error("Error during email verification:", error);
            res.status(500).json({ message: "An error occurred." });
        }
    });

    app.post('/api/verify-email/resend-verification-code', async (req, res, next) =>
    {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if(!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if(user.isEmailVerified) {
                return res.status(200).json({ message: 'Email is already verified.' });
            }

            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
            user.emailVerificationCode = verificationCode
            user.emailVerificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now

            await user.save();

            const mail = {
                from: emailAcc,
                to: email,
                subject: 'Email Verification for Your Account',
                html: `
                    <p>Hello ${user.username},</p>
                    <p>Here is your new verification code:</p>
                    <h3>${verificationCode}</h3>
                    <p>This code is valid for a limited time.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Regards,</p>
                    <p>ScreenBuddy</p>
                `
            };

            transporter.sendMail(mail, (error, info) => {
                console.log(info.response);
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Error resending verification email.' });
                }
                console.log('Verification email sent:', info.response);
                console.log(mail);
                res.status(200).json({ message: 'New verification code has been sent.' });
            });

            
        }
        catch (error) {
            console.error("Error during resend verification code:", error);
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

    app.post('/api/forgot-password', async (req, res, next) => 
    {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if(!user.isEmailVerified) {
                return res.status(401).json({ message: "Email not verified.", user: {id: user._id, email: user.email} });
            }


            let token;
            const MAX_RETRIES = 5;

            for (let i = 0; i < MAX_RETRIES; i++) {
                token = generateSecureRandomToken(32);

                try {
                    user.passwordResetToken = token;
                    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
                    await user.save();
                    break; // Exit the loop if save was successful
                } catch (saveError) {
                    // MongoDB error code for duplicate key is 11000
                    if (saveError.code === 11000) {
                        console.warn(`Attempt ${i + 1}/${MAX_RETRIES}: Token collision detected for user ${user.id}, regenerating...`);
                        if (i === MAX_RETRIES - 1) {
                            throw new Error('Failed to generate a unique token after multiple retries.');
                        }
                    } else {
                        // Re-throw any other type of error immediately
                        throw saveError;
                    }
                }
            }
            

            const BASE_URL = process.env.NODE_ENV === 'local'
            ? 'http://localhost:5000'
            : '' // insert website name here

            const resetLink = `${BASE_URL}/reset-password?token=${token}`;

            const emailContent = `
                Hello,

                You requested a password reset for your account.
                Please click on the following link to reset your password:

                ${resetLink}

                This link will expire in 15 minutes.
                If you did not request this, please ignore this email.

                Thank you,
                ScreenBuddy
            `;

            const mail = {
                from: emailAcc, 
                to: user.email,
                subject: 'Password Reset Request',
                text: emailContent,
                html: `<p>Hello,</p>
                    <p>You requested a password reset for your account.</p>
                    <p>Please click on the following link to reset your password:</p>
                    <p><a href="${resetLink}">${resetLink}</a></p>
                    <p>This link will expire in 15 minutes.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Thank you,</p>
                    <p>ScreenBuddy</p>`
            };

            transporter.sendMail(mail, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Error sending password reset email.' });
                }

                res.status(200).json({ message: 'Please check your email for a password reset link.' });
            });
        }
        catch (error) {
            console.error("Error during forgot password:", error);
            res.status(500).json({ message: "An error occurred." });
        }
    });

    app.post('/api/reset-password', async (req, res, next) => 
    {
        try {
            const { token, newPassword } = req.body;

            const user = await User.findOne({ passwordResetToken : token });

            if(!user) {
                return res.status(400).json({ message: 'User not found - Invalid token.'});
            }


            if(user.passwordResetExpires > new Date()) {
                user.password = newPassword;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                await user.save();

                return res.status(200).json({ message: 'Password has been reset.' });
            } else if (user.passwordResetExpires <= new Date()) {
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                await user.save();
                
                return res.status(400).json({ message: 'Token has expired. Please request a new one.' });
            }
            else {
                return res.status(400).json({ message: 'Why are you seeing this? - Invalid token.'});
            }

        }
        catch (error) {
            console.error("Error during reset password:", error);
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

    // buddy api endpoints
  app.use("/api/buddy", auth, buddyRoutes); 
  
  // goals api endpoints
  app.use("/api/goals", auth, goalRoutes);


  // screentime entries
  app.use("/api/logs", auth, activityRoutes);

  // statistics endpoints

}
