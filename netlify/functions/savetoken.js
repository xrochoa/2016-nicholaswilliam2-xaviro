// Netlify Function replacement for the original Express `/savetoken` endpoint.
//
// In the 2016 implementation this route received a Stripe token from
// `react-stripe-checkout` on the client, created a real charge with the
// Stripe secret key, and attached the cart items as charge metadata.
//
// For the portfolio demo we acknowledge the request and report success
// without charging anything, so the checkout flow can be demonstrated end
// to end without exposing any payment credentials.
//
// To re-enable real Stripe charges you would:
//   1. `npm install stripe` and add it to `dependencies` in package.json.
//   2. Set `STRIPE_SECRET_KEY` in Netlify env vars.
//   3. Replace this handler with the charge-creation logic from the 2016
//      server (see git history for the original Express implementation).

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        JSON.parse(event.body || '{}');
    } catch (e) {
        return { statusCode: 400, body: 'Invalid JSON' };
    }

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, demo: true })
    };
};
