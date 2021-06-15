const { sendEmail } = require('./lib/sendEmail');
export default async (req, res) => {
  console.log('set data::::', req.body);

  // "https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4"

  // get data
  const { firstname,
    lastname,
    email,
    urlVideo,
    urlShare,
    urlJoin,
    userId,
    locale,
  } = req.body;

  // send data to API toyota Admin


  // send data To API MoZeus

  // send email
  //const url = process.env.NEXT_PUBLIC_URL_SITE;
  //const urlShare = `${url}/join-experience/ckow41n6g0000bdnxgrzb6wsv`;

  const config = {
    // host: process.env.MAILTRAP_HOST,
    // port: process.env.MAILTRAP_PORT,
    // user: process.env.MAILTRAP_USERNAME,
    // pass: process.env.MAILTRAP_PASSWORD,
    host: process.env.AWS_SES_HOST,
    port: process.env.AWS_SES_PORT,
    user: process.env.AWS_SES_USERNAME,
    pass: process.env.AWS_SES_PASSWORD,
    from: 'Toyota <lcardona@mdsdigital.com>',
  };

  const options = {
    firstname,
    lastname,
    email,
    urlShare,
    locale,
  };

  console.log(config, options)

  await sendEmail(config, options);
  // return
  await res.status(200).send({ success: true, dataBody: req.body });
}