const { ResponseUtil } = require("../utils/ResponseDTO");
const { BadRequestError } = require("../utils/CustomError");
const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config')
const {google} = require('googleapis');
const stripe = require('stripe')(process.env.STRIPE_API_KEY)



exports.redirectToCheckout = async (req, res, next) => {
  const formData = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: "Class ",
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `http://127.0.0.1:5173/payment/successful`,
    cancel_url: `http://127.0.0.1:5173/payment/unsuccessful`,
    payment_intent_data:{
      metadata: formData,
    }
  });
  
  res.json({ url: session.url });
}