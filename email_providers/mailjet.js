require("dotenv").config();
const mailjet = require("node-mailjet").apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

exports.sendVerificationEmail = async function (username, email, verificationCode) {
  try {
    const request = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "cartert.business@gmail.com",
              Name: "ScreenBuddy",
            },
            To: [
              {
                Email: email,
                Name: username,
              },
            ],
            Subject: "Email Verification for Your Account",
            HTMLPart: `
              <p>Hello ${username},</p>
              <p>Thank you for registering with us! To complete your registration, please use the following verification code:</p>
              <h3>${verificationCode}</h3>
              <p>This code is valid for a limited time.</p>
              <p>If you did not request this, please ignore this email.</p>
              <p>Regards,</p>
              <p>ScreenBuddy</p>
            `,
          },
        ],
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