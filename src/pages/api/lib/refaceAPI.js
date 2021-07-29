const fetch = require('node-fetch');
const { configReface } = require('./config');
const { isValidJSON } = require('./utils');
let { logmailer, logmail } = require("./logmailer");

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
    logmail.summary.add("Starting time", `App run now: ${new Date().toISOString()}`);
    logmail.errors.add("refaceAPI ::getSignedUrl::", "Problem when get the signed URL by DeepFake Provider");
    logmail.errors.add(null, error);
    logmail.errors.add("endpoint", endPoint);
    logmail.errors.add(null, status);
    logmail.errors.add(null, res);

    logmailer.sendMail(err => {
        if (err) {
            console.log("error while sending", err);
        } else {
            console.log("error mail sent successfully");
        }
    });
    throw error;
  }
}

/**
 * [PUT] Upload Asset and return signed_url
 * @param {binary} binaryFile   binary file ['image/jpeg' | 'video/mp4']
 * @param {string} contentType  header Content-Type
 * @returns string JSON wit signed_url [image or video]
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
        headers: {'Content-Type': contentType}
      });

      const status = await response.status;
      //const bool = await response.text();
  
      return status === 200 ? data.signedUrl.split('?')[0] : false;
    }

  } catch (error) {
    console.error(error);
    logmail.summary.add("Starting time", `App run now: ${new Date().toISOString()}`);
    logmail.errors.add("refaceAPI ::uploadAsset::", "Error when upload photo");
    logmail.errors.add(null, error);
    logmail.errors.add(null, data);

    logmailer.sendMail(err => {
        if (err) {
            console.log("error while sending", err);
        } else {
            console.log("error mail sent successfully");
        }
    });    
    throw error;
  }
}

/**
 * [POST] Detect faces in Asset.
 * Image: detect and return the faces id
 * TODO: Video: return the ids face in the number faces into video (adjust)
 * @param {string} imageUrl     url image upload on reface
 * @param {string} contentType  header Content-Type
 * @returns Array with faces Id from the image (photo)
 */
const detectFacesInAsset = async (imageUrl, contentType) => {
  const endPoint = contentType === 'video/mp4' ? '/addvideo' : '/addimage';
  const obj = {image_url: imageUrl};

  try {
    const response = await fetch(`${configReface.url_base}${endPoint}`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json();
    //console.log(data);

    //const faces = Object.keys(data.imageInfo.faces);
    const faces = Object.entries(data.imageInfo.faces);

    return faces;

  } catch (error) {
    console.error(error);
    logmail.summary.add("Starting time", `App run now: ${new Date().toISOString()}`);
    logmail.errors.add("refaceAPI ::detectFacesInAsset::", "Error when detect faces");
    logmail.errors.add(null, error);
    logmail.errors.add(null, imageUrl);

    logmailer.sendMail(err => {
        if (err) {
            console.log("error while sending", err);
        } else {
            console.log("error mail sent successfully");
        }
    }); 
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

    let json;
    let attempt = true;

    // here attempt while response not json correct
    while(attempt) {
      const response = await fetch(`${configReface.url_base}/swapvideo`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {'Content-Type': 'application/json'}
      });
  
      json = await response.json();

      attempt = !isValidJSON(JSON.stringify(json));
    }

    return json;

  } catch (error) {
    console.log(JSON.stringify(obj));
    console.error(error);
    logmail.summary.add("Starting time", `App run now: ${new Date().toISOString()}`);
    logmail.errors.add("refaceAPI ::swapVideo::", "Error when swap videos, common: not json response = no process swap!");
    logmail.errors.add(null, error);
    logmail.errors.add(null, JSON.stringify(obj));
    logmail.errors.add(null, json);

    logmailer.sendMail(err => {
        if (err) {
            console.log("error while sending", err);
        } else {
            console.log("error mail sent successfully");
        }
    });
    throw error;
  }
};

module.exports = {
  getSignedUrl,
  uploadAsset,
  detectFacesInAsset,
  swapVideo,
};