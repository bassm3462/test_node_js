const nodemailer = require("nodemailer");
const mailtrap=require("mailtrap")

const sendEmail =  async (email, subject,name,SECURITY_COD,url) => {
  try {
    const transporter =  nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
      // host: "smtp.gmail.com",
      // port: 587,
      port: 2525,
      //   service: process.env.SERVICE,
      //   port: 587,
        // secure: true,
      auth: {
        // user: "bhasseim8@gmail.com",
        // pass: "pwxehenexdgfmxhu",
        user:"5b3bdfaacfc4be",
        pass:"e836597d6b64c1"
        
      },
    });
     await transporter.sendMail({
      from: '"Example Team" <bhasseim8@gmail.com>',
      to: email,
      subject: subject,
      // text: text,
      
      html:`<p> hi ${name} pleas click to verify email <a href="${url}">${SECURITY_COD}</a> </p>`,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
module.exports = sendEmail;

