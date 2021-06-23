const { sendEmail } = require('../lib/sendEmail');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const testEmail = async () => {
  const config = {
    host: process.env.AWS_SES_HOST,
    port: process.env.AWS_SES_PORT,
    user: process.env.AWS_SES_USERNAME,
    pass: process.env.AWS_SES_PASSWORD,
    from: process.env.NEXT_PUBLIC_FROM_EMAIL,
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