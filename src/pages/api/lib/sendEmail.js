const nodemailer = require('nodemailer');
const Email = require('email-templates');

// message example
message = {
  from: "jpulido@mdsdigital.com",
  to: "jpulido@mdsdigital.com",
  subject: "Test email",
  text: "Hello SMTP Email",
  html: "<h1>Hello SMTP Email</h1>"
};

let transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 465,
  auth: {
    user: "AKIASED4EMDDXHRVVACV",
    pass: "BO0EZTk2fdCZTA54suzroNKGjFpMAUozwmUtgWjzb3sv"
  // host: "smtp.mailtrap.io",
  // port: 2525,
  // auth: {
  //   user: "223d99de78ce34",
  //   pass: "d8b1baa9c9570d"
  }
});

const email = new Email({
  transport: transporter,
  send: true,
  preview: false,
});

transporter.sendMail(message, function(err, info) {
  if (err) {
    console.log(err)
  } else {
    console.log(info);
  }
});
