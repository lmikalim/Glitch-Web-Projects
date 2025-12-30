const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// CSP header to report violations
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy-Report-Only", "script-src 'self'; style-src 'self'; report-uri /csp-violation-report-endpoint");
  next();
});

app.post('/csp-violation-report-endpoint', (req, res) => {
  console.log('CSP Violation Report:', req.body);
  res.status(204).end();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set to true if using HTTPS
}));

const clientId = '3d100dab766f4fdeb9e02a746c672db3';
const clientSecret = '91e664efb83346d7821d33754a4b8c05';
const redirectUri = 'https://karaoke-playlist-maker.glitch.me/callback';

app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      })
    });

    const data = await response.json();
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    // Store tokens in the session
    req.session.access_token = accessToken;
    req.session.refresh_token = refreshToken;

    // Redirect to playlist maker page
    res.redirect('/playlist-maker.html');
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/profile', async (req, res) => {
  const accessToken = req.session.access_token;

  if (!accessToken) {
    return res.redirect('/login');
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/liked-songs', async (req, res) => {
  const accessToken = req.session.access_token;

  if (!accessToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Network response was not ok. Status: ${response.status}, Message: ${errorText}`);
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching liked songs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email user-library-read';
  const redirectUrl = `https://accounts.spotify.com/authorize?` +
    new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: 'some-random-state'
    }).toString();
  
  res.redirect(redirectUrl);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});
