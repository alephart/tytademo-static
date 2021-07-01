const fetch = require('node-fetch');
const { configAdmin } = require('./config');

const checkEmail = async (email) => {
  let emailExist = false;

  try {
    // Check unique email address  
    const response = await fetch(`${configAdmin.url_api}/checkEmail`, {
      method: 'POST',
      body:    JSON.stringify({email}),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();
    emailExist = json.exist;

    return emailExist;

  } catch (error) {
    return { error };
  }
};

exports.checkEmail = checkEmail;