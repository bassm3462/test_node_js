const nodemailer = require("nodemailer");
const mailtrap=require("mailtrap")

const sendEmail =  async (email, subject,name,SECURITY_COD,url) => {
  try {
    const transporter =  nodemailer.createTransport({
        service:"gmail",
        port:465,
        debug:true,
        secureConnection:false,
        secure: true,
        logger:true,
      auth: {
        user:"bassmhu786@gmail.com",
        // user: "bhasseim8@gmail.com",
        // pass: "pwxehenexdgfmxhu",
        pass:"xjdirfmepkjamfih",
        // user:"5b3bdfaacfc4be",
        // pass:"e836597d6b64c1"
      },
      tls:{
        rejectUnauthorized : true}
    });
     await transporter.sendMail({
      from: '"Example Team" <bassmhu786@gmail.com>',
      to: email,
      subject: subject,
      html:`<div style="width:300px;height:300px;background-color:#666666;border-radius: 15px"><p style="padding:10px"> hi ${name} pleas click to verify email <a href="${url}">${SECURITY_COD}</a> </p></div>`,
    });
  } catch (error) {
    console.log(error);
  }
};
const Resat =  async (email, subject,name,token,url) => {
  try {
    const transporter =  nodemailer.createTransport({
        service:"gmail",
        port:465,
        debug:true,
        secureConnection:false,
        // secure: true,
        // logger:true,
      auth: {
        user:"bassmhu786@gmail.com",
        pass:"xjdirfmepkjamfih",
      },
      tls:{
        rejectUnauthorized : true}
    });
     await transporter.sendMail({
      from: '"Example Team" <bassmhu786@gmail.com>',
      to: email,
      subject: subject,
      html:`<div style="width:300px;height:300px;background-color:#ececec;border-radius: 15px"><p style="padding:10px"> hi ${name} pleas click to Resat password <a href="${url}"target="_blank">${url}</a> </p></div>`,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {sendEmail,Resat};

