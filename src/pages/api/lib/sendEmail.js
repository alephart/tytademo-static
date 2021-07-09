const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');

// Here change __dirname by process.cwd(). __dirname return / ()
const pathToTemplates = path.join(process.cwd(), 'src/pages/api/email/templates');

const sendEmail = async (config, options) => {
  const { host, port, user, pass, from, preview = false, send = true } = config;
  const { firstname, lastname, email } = options;
  
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
    send,
    preview,
  });
  
  await newEmail.send({
    template: 'register',
    message: {
      from,
      to: `${firstname} ${lastname} <${email}>`,
    },
    locals: { 
      ...options,
     },
  })
  .then((res) => console.log('email message sent!'))
  .catch((error) => console.error('Error when send email!!!', error.message));
}

module.exports = {
  sendEmail,
};
