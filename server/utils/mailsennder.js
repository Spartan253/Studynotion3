// const nodemailer = require('nodemailer');

// const mailsender = async (email, title, body) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS,
//             }
//         })

//         let info = await transporter.sendMail({
//             from: "studynotion || codehelp bybabbber",
//             to: `${email}`,
//             subject: `${title}`,
//             html: `${body}`,
//         })
//         console.log(info);
//         return info;
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailsender;



const nodemailer = require("nodemailer");

const mailsender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,              // IMPORTANT
      secure: false,          // IMPORTANT (true only for 465)
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail error:", error);
    throw error; // VERY IMPORTANT
  }
};

module.exports = mailsender;
