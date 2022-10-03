const nodemailer = require("nodemailer")


module.exports = function sendEmail (invitee) {
// setting up nodemailer for sending email to users
console.log('one')
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_KEY,
    }
  });
console.log('two')
  let mailDetails = {
    from: process.env.MAIL_ADDRESS,
    to: invitee,
    subject: 'Test mail',
    text: 'Node.js testing mail for Game of Tribes',
  };
  console.log('three')
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
  });
}
