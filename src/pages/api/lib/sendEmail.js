const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const i18n = require('../locales');

console.log('i18n',i18n);


// Here change __dirname by process.cwd(). __dirname return / ()
const pathToTemplates = path.join(process.cwd(), 'src/pages/api/email/templates');
//const pathToTemplates2 = path.join(__dirname, '../email/templates');

const sendEmail = async (config, options) => {
  const { host, port, user, pass, from } = config;
  const { firstname, lastname, email, urlShare, locale } = options;
  
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
    i18n,
  });
  
  await newEmail.send({
    template: 'register',
    message: {
      from,
      to: `${firstname} ${lastname} <${email}>`,
    },
    locals: {
      locale,
      firstname,
      lastname,
      email,
      urlShare,
    }
  })
  .then(console.log('email sent!'))
  .catch(console.error('Error when send email!!!'));
  
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
