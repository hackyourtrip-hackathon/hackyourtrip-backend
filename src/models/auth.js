const axios = require('axios');
const oauth = require('axios-oauth-client');

async function getToken() {
  const getClientCredentials = oauth.client(axios.create(), {
    url: 'https://apis.discover.com/auth/oauth/v2/token',
    grant_type: 'client_credentials',
    client_id: 'l7xxbc96570ec3284e64a6378787668bc22f',
    client_secret: '1679a65c9fed4507a0e6b13e10ea8a27',
    scope: 'DCI_CURRENCYCONVERSION'
  })
   
  const auth = await getClientCredentials()
  return auth
  
}

module.exports = { getToken }