const fetch = require('node-fetch');
const { configAdmin } = require('./lib/config');
const { sendMozeus } = require('./lib/sendMozeus');
const { checkEmail } = require('./lib/checkEmail');
const { sendEmail } = require('./lib/sendEmail');

export default async (req, res) => {
  //console.log('set data::::', req.body);

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
    nameFilePhoto,
    pathFinalPhoto,
    character,
    locale,
    urlShare,
    urlJoin,
    urlPhoto,
    urlVideo,
    footage,
  } = req.body;

  
  try {    
    // First: check unique email address  
    const userExist = await checkEmail(email);
  
    if (userExist.error) {
      // log error
      res.status(500).send({ success: false, error});
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
        url_photo: urlPhoto,
        url_video: urlVideo,
        productnews: productNews,
        testdrive: testDrive,
        footage,
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
        res.status(500).send({ success: false, error});
      }

      // Third: Send data To API MoZeus
      const dataMozeus = {
        firstname,
        lastname,
        email,
        zipcode,
      };

      //await sendMozeus(dataMozeus);

      // Fourth: Email sending
      const config = {
        host: process.env.AWS_SES_HOST,
        port: process.env.AWS_SES_PORT,
        user: process.env.AWS_SES_USERNAME,
        pass: process.env.AWS_SES_PASSWORD,
        from: process.env.NEXT_PUBLIC_FROM_EMAIL,
      };

      const options = {
        firstname,
        lastname,
        email,
        urlShare,
        locale,
      };
      //console.log(config, options)
      await sendEmail(config, options);
      
      // return
      await res.status(200).send({ success: true, dataBody: req.body });
    } // eof userExist

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};