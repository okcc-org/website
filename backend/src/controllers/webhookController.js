const { ResponseUtil } = require("../utils/ResponseDTO");
const { BadRequestError } = require("../utils/CustomError");
const config = require('../config/config')
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const path = require('path');
const {google} = require('googleapis');


const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets', 
];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


/**
 * returns authorized google client with service account
 */
function authorize() {
    const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH, // Adjust as needed
    scopes: SCOPES
  })
  return auth;
}


async function addToGoogleSheet(range, valueInputOption, _values) {
  const auth = authorize()
    const sheets = google.sheets({version: 'v4', auth});
    let values = [
        _values
    ];
    const resource = {
        values,
    };
    try {
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: '1yTNlb7pX4-drdg5lbEemdJ3jscetJyV1H4GuVQAoImY',
            range,
            valueInputOption,
            resource,
        });
        console.log(`${result.data.updates.updatedCells} cells appended.`);
    }
    catch (e){
        console.log(e)
    }
}


exports.webhookHandler = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    console.warn("Missing Stripe signature header");
    return res.status(400).send("Missing signature");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.warn("Webhook signature verification failed:", err.message);
    return res.status(400).send("Invalid signature");
  }

  try {
    const handlers = {
      "charge.succeeded": handleChargeSucceeded,
      // Add more event handlers here as needed
    };

    const handler = handlers[event.type];
    if (!handler) {
      console.log(`Unhandled event type: ${event.type}`);
      // Still 200 — we received it, just don’t act on it
      return res.status(200).json({ received: true, ignored: event.type });
    }

    await handler(event);
    return res.status(200).json({ received: true });
  } catch (err) {
    // Non-2xx makes Stripe retry — good if downstream (Sheets) failed
    console.error("Webhook processing error:", err);
    return res.status(500).json({ error: "Processing failed" });
  }
};

async function handleChargeSucceeded(event) {
  const meta = event?.data?.object?.metadata || {};
  const required = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "className",
    "q1",
    "q2",
    "q3",
  ];

  const missing = required.filter((k) => !(k in meta) || meta[k] == null || meta[k] === "");
  if (missing.length) {
    throw new Error(`Missing required metadata: ${missing.join(", ")}`);
  }

  const values = required.map((k) => String(meta[k]).trim());
  await addToGoogleSheet("A1", "RAW", values);
}