const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
     host: 'smtp.gmail.com',
//   port: 465,
port: 2525,
  secure: true,
      //   service: process.env.SERVICE,
    //   port: 587,
      //   secure: true,
      auth: {
        user: "1a2b3c4d5e6f7g",
            pass: "1a2b3c4d5e6f7g"
      },
    });
    await transporter.sendMail({
      from:'"Example Team" <bhasseim8@gmail.com>',
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
module.exports = sendEmail;

// const nodemailer = require('nodemailer');
// const transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "1a2b3c4d5e6f7g",
//     pass: "1a2b3c4d5e6f7g"
//   }
// });
// const mailOptions = {
//   from: '"Example Team" <hbasseim82gmail.com>',
//   to: 'user1@example.com, user2@example.com',
//   subject: 'Nice Nodemailer test',
//   text: 'Hey there, it’s our first message sent with Nodemailer ',
//   html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
//   attachments: [
//     {
//       filename: 'mailtrap.png',
//       path: __dirname + '/mailtrap.png',
//       cid: 'uniq-mailtrap.png'
//     }
//   ]
// };
// transport.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log('Message sent: %s', info.messageId);
// });
