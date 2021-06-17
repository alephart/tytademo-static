const { lighten } = require('@material-ui/core');
const fetch = require('node-fetch');
const { configAdmin } = require('../lib/config');

// const configAdmin = 
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const req = {
  body: {
    firstname: 'Juan Carlos',
    lastname: 'Pulido',
    email: 'juancps@gmail.com',
    zipcode: '11109',
    productNews: true,
    //testDrive: true,
    userId: 'ckpzwbkbw0007sg9ke29hg1op',
    faceId: '99e978d8-d6e0-494f-80bc-e9af24e6603b',
    nameFilePhoto: 'photo-ckpzwbkbw0007sg9ke29hg1op.png',
    pathFinalPhoto: 'temp/photo-ckpzwbkbw0007sg9ke29hg1op.png',
    character: 'female',
    locale: 'en',
    urlShare: 'https://tytademo.devmds.com/share-experience/ckpzwbkbw0007sg9ke29hg1op',
    urlJoin: 'https://tytademo.devmds.com/join-experience/ckpzwbkbw0007sg9ke29hg1op',
    urlPhoto: 'https://mds-tyta.s3.amazonaws.com/photos/photo-ckpzwbkbw0007sg9ke29hg1op.png',
    urlVideo: 'https://mds-tyta.s3.amazonaws.com/videos/video-ckpzwbkbw0007sg9ke29hg1op_final.mp4',
    footage: [
      'https://mds-tyta.s3.amazonaws.com/photos/photo-ckpzwbkbw0007sg9ke29hg1op.png',
      'https://mds-tyta.s3.amazonaws.com/videos/video-ckpzwbkbw0007sg9ke29hg1op_final.mp4',
      'https://mds-tyta.s3.amazonaws.com/videos/4b91fafb-96a5-4d7c-aaa7-351bab704507_tbn.mp4',
      'https://mds-tyta.s3.amazonaws.com/videos/20fc9d86-b233-4eed-8daf-97660bb67f14.mp4',
      'https://mds-tyta.s3.amazonaws.com/videos/c6c83163-ee54-4cb5-8c3a-f498b4f81465.mp4',
      'https://mds-tyta.s3.amazonaws.com/videos/7b7246bf-f5e3-4fdd-ae82-1ae864414d69.mp4'
    ]
  }
};

const checkAdminApi = async (req) => {
  // get data from req body
  const {
    firstname,
    lastname,
    email,
    zipcode,
    productNews = false,
    testDrive = false,
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
    footage = [],
  } = req.body;

  let exist = false;

  // first check unique email address  
  await fetch(`${configAdmin.url_api}/checkEmail`, {
    method: 'POST',
    body:    JSON.stringify({email}),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => {
    exist = json.exist;
    console.log(json.exist ? 'claro que existe!' : 'no existe!');
  })
  .catch(err => console.error(err));

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

  console.log(dataAdmin);

  let jsonAdmin;
  
  if(!exist) {
    try {
      const resAdmin = await fetch(`${configAdmin.url_api}/participant`, {
        method: 'POST',
        body:    JSON.stringify(dataAdmin),
        headers: { 'Content-Type': 'application/json' },
      });
    
      jsonAdmin = await resAdmin.json();
      
    } catch (error) {
      console.error(error);
    }
    
    if(!jsonAdmin.participant) {
      console.error('Hubo un error!', jsonAdmin);
    } else {
      console.log(jsonAdmin);
    }
  }
};

checkAdminApi(req);
