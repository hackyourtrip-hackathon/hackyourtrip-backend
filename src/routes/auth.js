
const credentials = {
    client: {
      id: 'l7xxbc96570ec3284e64a6378787668bc22f',
      secret: '1679a65c9fed4507a0e6b13e10ea8a27'
    },
    auth: {
      tokenHost: 'https://apis.discover.com/auth/oauth/v2/token'
    }
  }

const oauth2 = require('simple-oauth2').create(credentials)
console.log(oauth2)

const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: null,
    scope: ['DCI_ATM DCI_CURRENCYCONVERSION'],
    state: null
  });

  res.redirect(authorizationUri);

  
const tokenConfig = {
    code: '<code>',
    redirect_uri: 'http://localhost:3000/callback',
    scope: ['DCI_ATM DCI_CURRENCYCONVERSION'] // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
};

try {
    const result = await oauth2.authorizationCode.getToken(tokenConfig)
    const accessToken = oauth2.accessToken.create(result);
} catch (error) {
    console.log('Access Token Error', error.message);
}

  const tokenObject = {
    'access_token': accessToken,
    'refresh_token': '<refresh-token>',
    'expires_in': '7200'
  };
   
  // Create the access token wrapper
  let accessToken = oauth2.accessToken.create(tokenObject);
   
  // Check if the token is expired. If expired it is refreshed.
  if (accessToken.expired()) {
    try {
      accessToken = await accessToken.refresh();
    } catch (error) {
      console.log('Error refreshing access token: ', error.message);
    }
  }