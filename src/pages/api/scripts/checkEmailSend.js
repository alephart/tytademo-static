const { sendEmail } = require('../lib/sendEmail');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const testEmail = async () => {
  const config = {
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
    from: 'Toyota <jpulido@mdsdigital.com>',
  };
  
  const options = {
    firstname: 'Juan',
    lastname: 'Pulido',
    email: 'juancpulidos@gmail.com',
    urlShare: 'https://tytademo.devmds.com',
    locale: 'es',
  };
  
  console.log(config, options);
  await sendEmail(config, options);
}

testEmail();