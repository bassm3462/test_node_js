const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, name, SECURITY_COD, url) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'bassmhu786@gmail.com',
        pass: 'wxhjourcxgrdgtuy',
      },
      tls: {
        rejectUnauthorized: false, // Set to true if you want to reject unauthorized connections
      },
    });
    const mailOptions = {
      from: '"Example Team" <bassmhu786@gmail.com>',
      to: email,
      subject: subject,
      html: `<div style="width:300px;height:300px;border-radius: 15px"><p style="padding:10px"> Hi ${name}, please click to verify email <a href="${url}">${SECURITY_COD}</a> </p></div>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
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
        pass:"wxhjourcxgrdgtuy",
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

