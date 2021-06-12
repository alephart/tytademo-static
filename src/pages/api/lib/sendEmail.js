const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');

// Here change __dirname by process.cwd(). __dirname return path / ()
const pathToTemplates = path.join(process.cwd(), 'src/pages/api/email/templates');
//const pathToTemplates2 = path.join(__dirname, '../email/templates');

const sendEmail = async (config, options) => {
  const { host, port, user, pass, from } = config;
  const { firstname, lastname, email, urlJoin } = options;
  
  let transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
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
      from,
      to: `${firstname} ${lastname} <${email}>`,
    },
    locals: {
      firstname,
      lastname,
      email,
      urlJoin,

    }
  })
  .then(() => console.log('email has been send!'));
  
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
