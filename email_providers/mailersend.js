require("dotenv").config();
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("codes@test-86org8e5opngew13.mlsender.net", "Verify");

exports.sendVerificationEmail = async function (username, email, verificationCode) {
  const recipients = [new Recipient(email, username)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Email Verification for Your Account")
    .setHtml(
      `
        <p>Hello ${username},</p>
        <p>Thank you for registering with us! To complete your registration, please use the following verification code:</p>
        <h3>${verificationCode}</h3>
        <p>This code is valid for a limited time.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Regards,</p>
        <p>ScreenBuddy</p>`
    )
    .setText(
      `Thank you for registering with us! Please verify your email address by entering the following code: ${verificationCode}. This code will expire in 15 minutes.`
    );

  let emailResponse = await mailerSend.email.send(emailParams);
  if (emailResponse.statusCode === 202) {
    console.log("Verification email sent successfully.");
    return { success: true, message: "Verification email sent." };
  } else {
    console.error("Failed to send verification email:", emailResponse);
    return { success: false, message: "Failed to send verification email." };
  }
};

