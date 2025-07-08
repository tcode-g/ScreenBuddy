import "dotenv/config";
import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

// exports.sendVerificationEmail = async function (username, email, verificationCode) {
export async function sendVerificationEmail(username, email, verificationCode) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
  });

  try {
    const data = await mg.messages.create(
      "sandbox7adb90957e254f079e7cf3d59d2fe066.mailgun.org",
      {
        from: "Verifier <postmaster@sandbox7adb90957e254f079e7cf3d59d2fe066.mailgun.org>",
        to: [email],
        subject: "Email Verification",
        html: `
                    <p>Hello ${username},</p>
                    <p>Thank you for registering with us! To complete your registration, please use the following verification code:</p>
                    <h3>${verificationCode}</h3>
                    <p>This code is valid for a limited time.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Regards,</p>
                    <p>ScreenBuddy</p>
                `,
      }
    );
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
