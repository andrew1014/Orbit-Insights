// Express server for handling Orbit Insights webhook requests
// Place this in /mnt/e/APEX/webhooks/index.js
//
// Two responsibilities:
// 1. POST /subscribe  -> adds a new subscriber (name/email) to a MailerLite group
//    (used by the homepage subscribe-form.html)
// 2. POST /webhook    -> sends a campaign broadcast (content field)
//    (used for automated newsletter delivery, not the subscribe form)
//
// Requirements:
// 1. Copy .env.example to .env and fill in real MailerLite credentials
// 2. Run with: node index.js  (loads .env via dotenv)
//
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const {
  MAILERLITE_API_KEY,
  MAILERLITE_CAMPAIGN_ID,
  MAILERLITE_GROUP_ID,
  DEBUG_MODE
} = require('./config');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // allow browser requests from GitHub Pages origin

// Health check endpoint
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// POST endpoint for new newsletter subscribers (used by subscribe-form.html)
app.post('/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: 'Missing required email field' });
    }

    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      if (DEBUG_MODE) {
        console.error('Missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID in .env');
      }
      return res.status(500).json({ error: 'Server not configured with MailerLite credentials' });
    }

    if (DEBUG_MODE) {
      console.log('Received subscribe request:', { name, email });
    }

    const response = await axios.post(
      `https://connect.mailerlite.com/api/subscribers`,
      {
        email,
        fields: { name: name || '' },
        groups: [MAILERLITE_GROUP_ID]
      },
      {
        headers: {
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    if (DEBUG_MODE) {
      console.log('MailerLite response:', response.data);
    }

    return res.status(200).json({ message: 'Subscribed successfully' });
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Subscribe error:', error.response?.data || error.message);
    }
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// POST endpoint for triggering a campaign send (content field)
app.post('/webhook', async (req, res) => {
  try {
    if (!req.body || !req.body.content) {
      return res.status(400).json({ error: 'Missing required content field' });
    }

    if (!MAILERLITE_API_KEY || !MAILERLITE_CAMPAIGN_ID) {
      return res.status(500).json({ error: 'Server not configured with MailerLite campaign credentials' });
    }

    if (DEBUG_MODE) {
      console.log('Received webhook request:', req.body);
    }

    const processedContent = req.body.content;

    const response = await axios.post(
      `https://api.mailerlite.com/api/v3/campaigns/${MAILERLITE_CAMPAIGN_ID}/send.json`,
      { campaign_id: MAILERLITE_CAMPAIGN_ID, content: processedContent },
      {
        headers: {
          'X-Mailerlite-Api-Key': MAILERLITE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    if (DEBUG_MODE) {
      console.log('MailerLite response:', response.data);
    }

    return res.status(200).json({ message: 'Content sent successfully' });
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Webhook error:', error.response?.data || error.message);
    }
    return res.status(500).json({ error: 'Failed to process content' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Webhook server running on http://0.0.0.0:${PORT}`);
  console.log('Use curl -v http://localhost:3000/test to test server availability');
  console.log('Use curl -v http://localhost:3000/subscribe -X POST to test subscriber signup');
  console.log('Use curl -v http://localhost:3000/webhook -X POST to test campaign send');
});
