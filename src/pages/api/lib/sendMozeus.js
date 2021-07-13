const fetch = require('node-fetch');
const { format } = require('date-fns');
const { configMozeus } = require('./config');  

const date = format(new Date(), 'MM-dd-yyyy HH:mm:ss');

const sendMozeus = async (data) => {

  // send data To API MoZeus
  const dataMozeus = {
    eventID: configMozeus.even_id, 
    date,
    consumers: [
      { fields: [
        { name: "firstName", value: data.firstname },
        { name: "lastName", value: data.lastname },
        { name: "email", value: data.email },
        { name: "zipCode", value: data.zipcode },
        { name: "emailOptin", value: "Yes" },
        { name: "dealerOptin", value: "No" } 
      ] }
    ]
  };

  try {
    const response = await fetch(`${configMozeus.url_api}/${configMozeus.user_id}`, {
      method: 'POST',
      body:    JSON.stringify(dataMozeus),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': configMozeus.token,
       },
    });
  
    const json = await response.json();
    return json;
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendMozeus,
};
