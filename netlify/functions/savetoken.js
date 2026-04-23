// Netlify Function replacement for the original Express `/savetoken` endpoint.
//
// In the 2016 implementation this route received a Stripe token from
// `react-stripe-checkout` on the client, created a real charge with the live
// Stripe secret key, and attached the cart items as charge metadata.
//
// For the portfolio demo we acknowledge the request and report success
// without charging anything, so the checkout flow can be demonstrated end to
// end. If a real `STRIPE_SECRET_KEY` is configured as an environment
// variable, it will be used to create a genuine test charge.

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let payload = {};
    try {
        payload = JSON.parse(event.body || '{}');
    } catch (e) {
        return { statusCode: 400, body: 'Invalid JSON' };
    }

    const secret = process.env.STRIPE_SECRET_KEY;

    if (!secret) {
        // Demo mode: just pretend the charge succeeded.
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, demo: true })
        };
    }

    try {
        const stripe = require('stripe')(secret);
        const { token, amount, details = [] } = payload;

        const metadata = {};
        details.forEach((item, i) => {
            metadata[`ITEM ${i + 1} Details`] = `Name: ${item.shirt.name} | Size: ${item.shirt.size} | Color: ${item.shirt.color}`;
            metadata[`ITEM ${i + 1} Price`] = `Qty: ${item.quantity} | Subtotal: $${item.quantity * item.shirt.price}`;
        });

        await stripe.charges.create({
            amount,
            currency: 'usd',
            source: token.id,
            description: 'Nicholas William Shirts Purchase',
            metadata
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true })
        };
    } catch (err) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: false, error: err.message })
        };
    }
};
