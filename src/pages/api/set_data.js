const { sendEmail } = require('./lib/sendEmail');


export default async (req, res) => {
  console.log('set data::::', req.body);


  // "https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4"

  // get data
  const { firstname, lastname, email, swap } = req.body;

  // send data to API toyota Admin


  // send data To API MoZeus

  // send email
  const url = process.env.NEXT_PUBLIC__URL_SITE;
  const urlVideo = `${url}/join-experience/ckow41n6g0000bdnxgrzb6wsv`;

  const options = {
    firstname,
    lastname,
    email,
    urlVideo,
  };

  await sendEmail(options);

  // return response


  await res.status(200).send({ success: true, dataBody: req.body });
}