const fetch = require('node-fetch');
const { configAdmin } = require('./lib/config');
const { sendMozeus } = require('./lib/sendMozeus');
const { checkEmail } = require('./lib/checkEmail');

      // Fourth: Email sending
      const config = {
        host: process.env.AWS_SES_HOST,
        port: process.env.AWS_SES_PORT,
        user: process.env.AWS_SES_USERNAME,
        pass: process.env.AWS_SES_PASSWORD,
        from: process.env.NEXT_PUBLIC_FROM_EMAIL,
      };
      
      const urlOpenBrowser = `${process.env.NEXT_PUBLIC_URL_SITE}/${locale === 'es' ? 'es/' : ''}mailing-experience?share=${urlShare}`;

      const options = {
        locale,
        firstname,
        lastname,
        email,
        urlShare,
        urlOpenBrowser,
        textOpenBrowser,
        textTitle,
        imgTitle,
        textMessage,
        imgButton,
        textButton,
        metaTitle,
      };

      console.log(config, options)
      await sendEmail(config, options);