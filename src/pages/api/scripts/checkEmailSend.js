const { sendEmail } = require('../lib/sendEmail');
const i18n = require('../locales');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const testEmail = async () => {
  const locale = 'en';
  i18n.setLocale(locale);
  
  const urlShare = process.env.NEXT_PUBLIC_URL_SITE;
  const urlOpenBrowser = `${process.env.NEXT_PUBLIC_URL_SITE}/${locale === 'es' ? 'es/' : ''}mailing-experience?share=${urlShare}`;

  const config = {
    host: process.env.AWS_SES_HOST,
    port: process.env.AWS_SES_PORT,
    user: process.env.AWS_SES_USERNAME,
    pass: process.env.AWS_SES_PASSWORD,
    from: process.env.NEXT_PUBLIC_FROM_EMAIL,
    send: false,
    preview: true,
  };
  
  const options = {
    firstname: 'Juan',
    lastname: 'Pulido',
    email: 'juancpulidos@gmail.com',
    urlShare,
    urlOpenBrowser,
    textOpenBrowser: i18n.__('mailing.openWithBrowser'),
    textTitle: i18n.__('mailing.titleName'),
    imgTitle: i18n.__('mailing.title.youMadeIt'),
    textMessage: i18n.__('mailing.watchYouFullVideo'),
    imgButton: i18n.__('mailing.btn.watchVideo'),
    textTerms: i18n.__('mailing.terms'),
  };
  
  console.log(config, options);
  await sendEmail(config, options);
}

testEmail();