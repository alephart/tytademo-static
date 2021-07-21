//import getT from 'next-translate/getT';
const { sendEmail } = require('../lib/sendEmail');

// @ts-ignore

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const testEmail = async () => {
  const locale = 'en';
  //const t = await getT(locale, 'common')

  
  const urlShare = process.env.NEXT_PUBLIC_URL_SITE;
  const urlOpenBrowser = `${process.env.NEXT_PUBLIC_URL_SITE}/${locale === 'es' ? 'es/' : ''}mailing-experience?share=${urlShare}`;

  const config = {
    host: process.env.AWS_SES_HOST,
    port: process.env.AWS_SES_PORT,
    user: process.env.AWS_SES_USERNAME,
    pass: process.env.AWS_SES_PASSWORD,
    from: process.env.NEXT_PUBLIC_FROM_EMAIL,
    send: true,
    preview: true,
  };
  
  const options = {
    locale,
    firstname: 'Juan',
    lastname: 'Pulido',
    email: 'juancpulidos@gmail.com',
    urlShare,
    urlOpenBrowser,
    textOpenBrowser: 'Open with browser',
    textTitle: '¡LO LOGRASTE!',
    imgTitle: 'https://devmds.com/toyota/title.png',
    textMessage: 'You already are the star of “Todo o Nada”. Click to watch your full video featuring you with Lunay.',
    imgButton: 'https://devmds.com/toyota/watch-video.png',
    textButton: 'VER VIDEO',
    metaTitle: 'Featuring You Lunay X Toyota',
  };
  
  console.log(config, options);
  await sendEmail(config, options);
}

testEmail();