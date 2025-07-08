require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.MAILGUN_SMTP_LOGIN,
    pass: process.env.MAILGUN_SMTP_PASSWORD,
  },
});

exports.sendVerificationEmail = async function (username, email, verificationCode) {
  try {
    const mailOptions = {
      from: '"ScreenBuddy" <codes@sandbox7adb90957e254f079e7cf3d59d2fe066.mailgun.org>',
      to: email,
      subject: "Email Verification",
      text: `Hello ${username},\n\nYour verification code is: ${verificationCode}\n\nThank you!`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
    return { success: true, message: "Verification email sent." };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
};
