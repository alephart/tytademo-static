// https://api.ipstack.com/check?access_key=YOUR_ACCESS_KEY

const acceptGeo = [
  'US',
  'CO',
  'PR',
];

const formatCheck = (check) => {
  return Array.isArray(check) ? check.split() : check;
};

export const geoIP = (apiKey, check = 'check') => () =>
  fetch(`https://api.ipstack.com/${formatCheck(check)}?access_key=${apiKey}`, { mode: "cors" })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`geoIP request error. ${res}`);
    })
    .then(json => {
      return acceptGeo.includes(json.country_code);
    })
    .catch(err => {
      throw new Error(`Cannot fetch correct data from GeoIP. ${err}`);
    });
