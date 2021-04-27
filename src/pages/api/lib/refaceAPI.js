const fetch = require('node-fetch');
const { configReface } = require('./config');

/**
 * [GET] Generate Signed URL (video or image)
 * @param {strin} type file type to get signed_url
 * @returns string JSON with signed_url or error message
 */
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

/**
 * [PUT] Upload Asset and return signed_url
 * @param {binary} binaryFile   binary file. image or video.
 * @param {string} contentType  header Content-Type
 * @returns string JSON wit signed_url (image or video)
 */
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

/**
 * [POST] Detect face in Asset.
 * Image: return the first id face or specific number of array
 * TODO: Video: return the ids face in the number faces into video (adjust)
 * @param {string} imageUrl     url image upload on reface
 * @param {string} contentType  header Content-Type
 * @param {number} numberFace   is the number face in array to get id
 * @returns the faceId from the image (photo)
 */
const detectFacesInAsset = async (imageUrl, contentType, numberFace = 0) => {
  const endPoint = contentType === 'video/mp4' ? '/addvideo' : '/addimage';
  let resFinal = [];

  const obj = {image_url: imageUrl};

  try {
    const response = await fetch(`${configReface.url_base}${endPoint}`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json();
    console.log(data);

    //const faces = Object.keys(data.imageInfo.faces);
    const faces = Object.entries(data.imageInfo.faces);

    return faces;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * [POST] Swap video - return of url video swap
 * @param {object} obj obj with data face mappign [/swapvideo] 
 * @returns [application/json] a json data response from swap video reface
 */
const swapVideo = async (obj) => {
  try {
    const response = await fetch(`${configReface.url_base}/swapvideo`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {'Content-Type': 'application/json'}
    });

    const json = await response.json();

    return json;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getSignedUrl,
  uploadAsset,
  detectFacesInAsset,
  swapVideo,
};