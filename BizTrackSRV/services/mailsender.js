const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'BizTrack@gmail.com', //generate new mail new pass key
    pass: 'kxvqhzxgddkeijpe'
  }
});

exports.sendMail = (userDetails) => {
  const mailOptions = {
    from: "set sender subject here",
    to: userDetails.email,
    subject: "set mail subject here",
    html: `
      set mail content here
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};