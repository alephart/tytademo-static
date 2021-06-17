const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const i18n = require('../locales');

//console.log('i18n',i18n);

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
    views: {
      root: pathToTemplates,
    },
    transport: transporter,
    send: true,
    preview: false,
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
  .then((res) => console.log('email mmesage sent!'))
  .catch((error) => console.error('Error when send email!!!', error.message));
}

module.exports = {
  sendEmail,
};
