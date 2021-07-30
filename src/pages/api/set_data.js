const fetch = require('node-fetch');
const { configAdmin } = require('./lib/config');
const { sendMozeus } = require('./lib/sendMozeus');
const { checkEmail } = require('./lib/checkEmail');
//const { sendEmail } = require('./lib/sendEmail');

export default async (req, res) => {  
  // get data from req body
  const {
    firstname,
    lastname,
    email,
    zipcode,
    productNews = true || false,   // this way
    testDrive = testDrive && true, // or this way
    userId,
    faceId,
    character,    
    pathFinalPhoto,
    nameFilePhoto,
    locale,
    urlShare,
    urlJoin,
    urlVideo,
    footage,
    textOpenBrowser,
    textTitle,
    imgTitle,
    textMessage,
    imgButton,
    textButton,
    metaTitle,
  } = req.body;

  console.log(req.body);

  try {    
    // First: check unique email address  
    const userExist = await checkEmail(email);
  
    if (userExist.error) {
      // log error
      res.status(500).send({ success: false, action: 'userExist', error});
    }

    if(userExist) {
      res.status(200).send({ success: false, action: 'checkEmail', userExist });
    
    } else {
      // Second: send data to API Toyota Admin
      const dataAdmin = {
        participant_id: userId,
        firstname,
        lastname,
        email,
        zipcode,
        character,
        participant_face_id: faceId,
        url_photo: pathFinalPhoto,
        productnews: productNews,
        testdrive: testDrive,

        //url_video: urlVideo, // not going
        //footage, // not going
      };

      let jsonAdmin;

      try {
        const resAdmin = await fetch(`${configAdmin.url_api}/participant`, {
          method: 'POST',
          body:    JSON.stringify(dataAdmin),
          headers: { 'Content-Type': 'application/json' },
        });
      
        jsonAdmin = await resAdmin.json();
        
        if(!jsonAdmin.participant) {
          // return
          res.status(200).send({ success: false, action: 'saveParticipant', userExist: jsonAdmin.participant });
        }

      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, action: 'saveParticipant', error});
      }

      let mozeus = {};
      
      if(process.env.NODE_ENV === 'production') {
        // Third: Send data To API MoZeus
        const dataMozeus = {
          firstname,
          lastname,
          email,
          zipcode,
        };

        //mozeus = await sendMozeus(dataMozeus);
      }

      // // Fourth: Email sending
      // const config = {
      //   host: process.env.AWS_SES_HOST,
      //   port: process.env.AWS_SES_PORT,
      //   user: process.env.AWS_SES_USERNAME,
      //   pass: process.env.AWS_SES_PASSWORD,
      //   from: process.env.NEXT_PUBLIC_FROM_EMAIL,
      // };
      
      // const urlOpenBrowser = `${process.env.NEXT_PUBLIC_URL_SITE}/${locale === 'es' ? 'es/' : ''}mailing-experience?share=${urlShare}`;

      // const options = {
      //   locale,
      //   firstname,
      //   lastname,
      //   email,
      //   urlShare,
      //   urlOpenBrowser,
      //   textOpenBrowser,
      //   textTitle,
      //   imgTitle,
      //   textMessage,
      //   imgButton,
      //   textButton,
      //   metaTitle,
      // };

      // console.log(config, options)
      // await sendEmail(config, options);
      
      // return
      await res.status(200).send({ success: true, dataBody: req.body, mozeus });
    } // eof userExist

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};