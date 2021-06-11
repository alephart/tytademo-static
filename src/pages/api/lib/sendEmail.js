const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');

// Here change __dirname by process.cwd(). __dirname return path / ()
const pathToTemplates = path.join(process.cwd(), 'src/pages/api/email/templates');
const pathToTemplates2 = path.join(__dirname, '../email/templates');

const sendEmail = async (options) => {
  const { firstname, lastname, email, urlVideo } = options;
  
  console.log(__dirname);
  console.log(process.cwd());
  console.log('path', __dirname);
  console.log('pathToTemplates', pathToTemplates);
  console.log('pathToTemplates2', pathToTemplates2);
  
  let transporter = nodemailer.createTransport({
    // host: "email-smtp.us-east-1.amazonaws.com",
    // port: 465,
    // auth: {
    //   user: process.env.AWS_SES_USERNAME,
    //   pass: process.env.AWS_SES_PASSWORD,
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    }
  });
  
  const newEmail = new Email({
    transport: transporter,
    send: true,
    preview: false,
    views: {
      root: pathToTemplates,
    },
  });
  
  await newEmail.send({
    template: 'register',
    message: {
      from: 'jpulido@mdsdigital.com',
      to: email,
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
