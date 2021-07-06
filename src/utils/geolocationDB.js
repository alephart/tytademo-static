// what happend if fetch error: request or geolocation?

export const geolocationDb = apiKey => () =>
  fetch(`https://geolocation-db.com/json/${apiKey}`, { mode: "cors" })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Request error. ${res.status}`);
    })
    .then(res => res.country_code)
    .catch(e => {
      throw new Error(`Cannot fetch country from Geolocation DB. ${e}`);
    });
