const { ResponseUtil } = require("../utils/ResponseDTO");
const { BadRequestError } = require("../utils/CustomError");
const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config')
const {google} = require('googleapis');
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

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


async function addToGoogleSheet(spreadsheetId, range, valueInputOption, _values) {
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
			spreadsheetId,
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

exports.register = async (req, res, next) => {
  const formInput = req.body
  let values = [
    formInput.first_name, 
    formInput.last_name, 
    formInput.email, 
    formInput.phone_number, 
    formInput.class_name, 
    formInput.q1, 
    formInput.q2, 
    formInput.q3
  ];
  try {
    await addToGoogleSheet('1yTNlb7pX4-drdg5lbEemdJ3jscetJyV1H4GuVQAoImY', "A1", 'RAW', values)
    res.status(200).json(ResponseUtil.success("Successfully Registered", formInput));
  }
  catch (e){
      next(e);
  }
}

exports.redirectToCheckout = async (req, res, next) => {
  const { first_name, last_name, email, phone_number, class_name, q1, q2, q3 } = req.body;

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
    success_url: `http://127.0.0.1:5173/success`,
    cancel_url: `http://127.0.0.1:5173/classes`,
    metadata: {
      email
    }
  });
  
  res.json({ url: session.url });
}

exports.handleSuccess = async (req, res, next) => {
  const formInput = req.body.metadata
  let values = [
    formInput.first_name, 
    formInput.last_name, 
    formInput.email, 
    formInput.phone_number, 
    formInput.class_name, 
    formInput.q1, 
    formInput.q2, 
    formInput.q3
  ];
  try {
    await addToGoogleSheet('1yTNlb7pX4-drdg5lbEemdJ3jscetJyV1H4GuVQAoImY', "A1", 'RAW', values)
    res.status()
  }
  catch (e){
    console.log(e)
  }
}