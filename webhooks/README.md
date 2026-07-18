## MailerLite Webhook Integration - Embedding Guide

### How to Embed the Subscription Form
1. Copy the contents of `subscribe-form.html` into your webpage
2. Replace the webhook URL with your production endpoint
3. Customize colors/styles to match your site's branding
4. Add to your homepage (e.g., in `/mnt/e/APEX/_posts/index.md`)

### Customization Tips
- Modify the CSS variables in `:root` for different color schemes
- Update the form action URL to your production webhook endpoint
- Adjust the animation durations in the `.star` CSS class
- Customize the success/error messages in JavaScript

### Security Notes
- Always use HTTPS for production endpoints
- Validate and sanitize all user inputs on your server
- Consider adding reCAPTCHA for spam protection
- Monitor for abuse patterns in your webhook logs
- Keep your MailerLite API credentials secure

### Technical Requirements
- Server must run on port 3000 (or update the form's action URL)
- Ensure CORS headers are configured correctly
- Validate JSON payloads on your server-side endpoint
- Rate-limit form submissions to prevent abuse