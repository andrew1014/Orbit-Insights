// Config file for MailerLite webhook
// Place this in /mnt/e/APEX/orbit-insights/webhooks/config.js
//
// Values are pulled from environment variables (see .env / .env.example)
//
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_CAMPAIGN_ID = process.env.MAILERLITE_CAMPAIGN_ID;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

module.exports = {
  MAILERLITE_API_KEY,
  MAILERLITE_CAMPAIGN_ID,
  MAILERLITE_GROUP_ID,
  DEBUG_MODE
};
