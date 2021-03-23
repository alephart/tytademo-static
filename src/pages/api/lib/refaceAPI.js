const fetch = require('node-fetch');
const { configReface } = require('./config');

// Get Signed URL
const getSignedUrl = async (type) => {
  const endPoint = `/getsignedurl?extension=${type}`;
  try {
    const response = await fetch(`${configReface.url_base}${endPoint}`);
    const status = await response.status;
    const msg = await response.text();

    let res;

    switch (status) {
      case 400:
        res = JSON.stringify({success: false, error: 'Bad Request', msg: msg});
        break;

      case 401:
        res = JSON.stringify({success: false, error: 'Unathorized', msg: msg});
        break;
    
      default:
        res = JSON.stringify({success: true, signedUrl: msg});
        break;
    }

    return res;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Upload Asset (PUT)
// return the url file (image or video)
const uploadAsset = async (binaryFile, contentType) => {
  const type = contentType.split('/')[1];
  let res, data;

  try {
    const signedUrl = await getSignedUrl(type);
    data = JSON.parse(signedUrl);

    if(data.success) {
      const response = await fetch(data.signedUrl, {
        method: 'PUT',
        body: binaryFile,
        headers: {'Content-Type': contentType} // eg: 'image/jpeg' | 'video/mp4'
      });

      const status = await response.status;
      const bool = await response.text();
  
      if (status === 200) {
        res = JSON.stringify({success: true, urlFile: data.signedUrl.split('?')[0]});
      } else {
        res = JSON.stringify({success: false, error: 'ERROR - uploading to Google Storage Failed', msg: bool});
      }

      return res;

    }

  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Detect face in Asset - this return the faces. 
// In video return the id face in the number faces into video 
// In image return the id face from partipant

const detectFaceInAsset = async (imageUrl, type, numberFace = 0) => {
  const endPoint = type === 'video/mp4' ? '/addvideo' : '/addimage';
  let resFinal = [];

  const obj = {image_url: imageUrl};

  try {
    const response = await fetch(`${configReface.url_base}${endPoint}`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json();

    const faces = Object.keys(data.imageInfo.faces);

    return faces[numberFace];

  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Swap video - return of url video swap
const swapVideo = async (data) => {

  // const videos = [
  //   {
  //     intensity: 1,
  //     video_id: 'b03bcf8f-d544-4725-bed6-3710255fba48',
  //     facemapping: {
  //       '8a3ad45c-fb07-48ad-818a-6a28af806233': [
  //         faceId
  //       ]
  //     }
  //   },
  //   {
  //     intensity: 1,
  //     video_id: 'fdf3f31e-4f66-4b23-9dd4-ee0e523ebe84',
  //     facemapping: {
  //       '75d80011-45d1-4a5f-8aec-e7ffceb3d869': [
  //         faceId
  //       ]
  //     }
  //   },
  //   {
  //     intensity: 1,
  //     video_id: '71ceccf3-b309-4820-9040-bbb5c705f7a7',
  //     facemapping: {
  //       '97faf846-8549-4a51-ac9d-ec5ba6869463': [
  //         faceId
  //       ]
  //     }
  //   },
  // ];

  try {
    const response = await fetch(`${configReface.url_base}/swapvideo`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });

    const json = await response.json();

    return json;

  } catch (error) {
    console.error(error);
    throw error;
  }

}

module.exports = {
  getSignedUrl,
  uploadAsset,
  detectFaceInAsset,
  swapVideo,
};