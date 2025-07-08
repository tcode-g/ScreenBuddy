const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Load client secret from file
const CREDENTIALS_PATH = path.join(__dirname, "../client_secret.json");
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8")).installed;

const oAuth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

const TOKEN_PATH = path.join(__dirname, "../gmail_token.json");
const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));

// Set credentials from gmail_token.json
oAuth2Client.setCredentials({
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    scope: token.scope,
    token_type: token.token_type,
    expiry_date: token.expiry_date
});

// You need to set the refresh token here after the first manual OAuth2 flow
// oAuth2Client.setCredentials({
//   refresh_token: process.env.GMAIL_REFRESH_TOKEN // Store this securely after initial setup
// });

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

exports.sendVerificationEmail = async function (username, email, verificationCode) {
  const message = 
`From: cartert.business@gmail.com
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

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

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