// Express server for handling webhook requests
// Place this in /mnt/e/APEX/orbit-insights/webhooks/index.js
//
// Requirements:
// 1. Set up a MailerLite campaign with the correct template
// 2. Replace API key and campaign ID in config.js
// 3. Run with node index.js
//
// Error handling:
// - Logs errors to console
// - Returns 500 for API failures
// - Returns 400 for malformed requests
//
const express = require('express');
const axios = require('axios');
const { MAILERLITE_API_KEY, MAILERLITE_CAMPAIGN_ID, DEBUG_MODE } = require('./config');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// POST endpoint for receiving new posts
app.post('/webhook', async (req, res) => {
  try {
    // Validate request (optional but recommended)
    if (!req.body || !req.body.content) {
      return res.status(400).json({ error: 'Missing required content field' });
    }

    // Log incoming request
    if (DEBUG_MODE) {
      console.log('Received webhook request:', req.body);
    }

    // Process Markdown content (optional: convert to HTML)
    const processedContent = req.body.content;

    // Prepare payload for MailerLite API
    const payload = {
      campaign_id: MAILERLITE_CAMPAIGN_ID,
      content: processedContent
    };

    // Send to MailerLite API
    const response = await axios.post(
      `https://api.mailerlite.com/api/v3/campaigns/${MAILERLITE_CAMPAIGN_ID}/send.json`,
      payload,
      {
        headers: {
          'X-Mailerlite-Api-Key': MAILERLITE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log success
    if (DEBUG_MODE) {
      console.log('MailerLite response:', response.data);
    }

    // Return success response
    return res.status(200).json({ message: 'Content sent successfully' });
  } catch (error) {
    // Log error
    if (DEBUG_MODE) {
      console.error('Webhook error:', error.message);
      console.error('Stack trace:', error.stack);
    }

    // Return error response
    return res.status(500).json({ error: 'Failed to process content' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Webhook server running on http://0.0.0.0:${PORT}`);
  console.log('Use curl -v http://localhost:3000/test to test server availability');
  console.log('Use curl -v http://localhost:3000/webhook -X POST to test webhook endpoint');
});
