const fetch = require('node-fetch');
const { configAdmin } = require('./lib/config');
const { sendEmail } = require('./lib/sendEmail');

export default async (req, res) => {
  //console.log('set data::::', req.body);

  // get data from req body
  const {
    firstname,
    lastname,
    email,
    zipcode,
    productNews = true || false,
    testDrive = testDrive && true,
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
    // first check unique email address  
    await fetch(`${configAdmin.url_api}/checkEmail`, {
      method: 'POST',
      body:    JSON.stringify({email}),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
      if(json.exist) {
        // return
        res.status(200).send({ success: false, action: 'checkEmail', userExist: json.exist });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ success: false, error});
    });

    // send data to API Toyota Admin
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

    //console.log(dataAdmin);

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

    // send data To API MoZeus
    // const dataMozeus = {
    //   firstName: firstname,
    //   lastName: lastname,
    //   email,
    //   zipCode: zipcode,
    // }

    // const resMozeus = await fetch(`${configMozeus.url_api}/${configMozeus.user_id}`, {
    //   method: 'POST',
    //   body:    JSON.stringify(dataMozeus),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // const jsonMozeus = await resMozeus.json();
    // console.log(jsonMozeus);  

    // email sending
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

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};