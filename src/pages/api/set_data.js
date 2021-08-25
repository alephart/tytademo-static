const fetch = require('node-fetch');
const { configAdmin } = require('./lib/config');
const { sendMozeus } = require('./lib/sendMozeus');
const { checkEmail } = require('./lib/checkEmail');

export default async (req, res) => {  
  // get data from req body
  const {
    firstname,
    lastname,
    email,
    zipcode,
    productNews = productNews && true,
    testDrive = testDrive && true,
    userId,
    faceId,
    character,    
    pathFinalPhoto,
  } = req.body;

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
          emailOptin: productNews ? 'Yes' : 'No',
          dealerOptin: testDrive ? 'Yes' : 'No',
        };

        mozeus = await sendMozeus(dataMozeus);
        console.log('mozeus', mozeus);
      }
      
      // return
      await res.status(200).send({ success: true, dataBody: req.body, mozeus });
    } // eof userExist

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};