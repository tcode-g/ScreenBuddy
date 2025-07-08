require("dotenv").config();
const { google } = require("googleapis");


let auth = google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.EMAIL_ACCOUNT,
    private_key: process.env.EMAIL_PASSWORD.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/gmail.send"],
});

const gmail = google.gmail({
  version: "v1",
  auth: auth,
});
exports.sendVerificationEmail = async function (username, email, verificationCode) {
  const message = `
    From: "ScreenBuddy" <${process.env.EMAIL_ACCOUNT}>
    To: ${email}
    Subject: Email Verification for Your Account
    Content-Type: text/html; charset=UTF-8

    <p>Hello ${username},</p>
    <p>Thank you for registering with us! To complete your registration, please use the following verification code:</p>
    <h3>${verificationCode}</h3>
    <p>This code is valid for a limited time.</p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Regards,</p>
    <p>ScreenBuddy</p>
  `;

  const encodedMessage = Buffer.from(message).toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    return { success: true, message: "Verification email sent." };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
};

exports.sendEmail = async function (username, email, verificationCode) {
  return exports.sendVerificationEmail(username, email, verificationCode);
};