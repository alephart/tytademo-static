const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');

const pathToTemplates = path.join(__dirname, '../email/templates');

const sendEmail = async (options) => {
  const { firstname, lastname, email, urlVideo } = options;

  let transporter = nodemailer.createTransport({
    // host: "email-smtp.us-east-1.amazonaws.com",
    // port: 465,
    // auth: {
    //   user: "AKIASED4EMDDXHRVVACV",
    //   pass: "BO0EZTk2fdCZTA54suzroNKGjFpMAUozwmUtgWjzb3sv"
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "223d99de78ce34",
      pass: "d8b1baa9c9570d"
    }
  });
  
  const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
    views: {
      root: pathToTemplates,
    },
  });
  
  await email.send({
    template: 'register',
    message: {
      from: 'jpulido@mdsdigital.com',
      to: 'juancpulidos@gmail.com',
    },
    locals: {
      firstname,
      lastname,
      email,
      urlVideo,

    }
  }).then(() => console.log('email has been send!'));
  
}

module.exports = {
  sendEmail,
};

// // message example
// mailOptions = {
//   from: "jpulido@mdsdigital.com",
//   to: "jpulido@mdsdigital.com",
//   subject: "Test email",
//   text: "Hello SMTP Email",
//   html: "<h1>Hello SMTP Email</h1>"
// };

// transporter.sendMail(mailOptions, function(err, info) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(info);
//   }
// });
