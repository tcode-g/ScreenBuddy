const fs = require('fs');
const { google } = require('googleapis');

const CREDENTIALS_PATH = './client_secret.json';
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8')).installed;

const oAuth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

async function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  // Paste the code from the browser here
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question('Enter the code from that page here: ', (code) => {
    readline.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      console.log('Your refresh token:', token.refresh_token);
      // Optionally, save the token to a file
      // fs.writeFileSync('gmail_token.json', JSON.stringify(token));
    });
  });
}

getAccessToken();