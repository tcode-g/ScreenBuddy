// const { sendVerificationEmail: sendEmailMailersend } = require("./email_providers/mailersend.js");

// exports.sendVerificationEmail = async function (username, email, verificationCode) {
//   try {
//     const result = await sendEmailMailersend(username, email, verificationCode);
//     return result;
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     return { success: false, message: "Failed to send verification email." };
//   }
// }

// const {sendEmail} = require("./email_providers/gmail.js");
// let req = await sendEmail("Test User", "testuser@example.com", "123456");
// console.log(req);

// import { sendVerificationEmail } from "./email_providers/mailjet.js";
// // const {sendVerificationEmail} = require("./email_providers/mailjet.js");
// let req = await sendVerificationEmail("Test User", "thefunnytrevor@gmail.com", "123456");
// console.log(req);


// import { sendVerificationEmail } from "./email_providers/mailgunsmtp.js";
// let req = await sendVerificationEmail("username", "thefunnytrevor@gmail.com", "123456");
// console.log(req);

// import { sendVerificationEmail } from "./email_providers/gmail2.js";
// let req = await sendVerificationEmail("Test User", "thefunnytrevor@gmail.com", "123456");
// console.log(req);


exports.sendVerificationEmail = async function (username, email, verificationCode) {
    try {
        const { sendVerificationEmail } = require("./email_providers/gmail2.js");
        const result = await sendVerificationEmail(username, email, verificationCode);
        return result;
    } catch (error) {
        console.error("Error sending verification email:", error);
        return { success: false, message: "Failed to send verification email." };
    }
}
