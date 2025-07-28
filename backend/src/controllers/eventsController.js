const { ResponseUtil } = require("../utils/ResponseDTO");
const { BadRequestError } = require("../utils/CustomError");
const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config')
const {google} = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly'
];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


/**
 * returns authorized google client with service account
 */
function authorize() {
	const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES
  })
  return auth;
}

exports.getEvents = async (req, res, next) => {
  const auth = authorize();
  const calendar = google.calendar({version: 'v3', auth});
  const results = await calendar.events.list({
      calendarId: '6d6a2408cd2de42cb1a0cfeaa3af31a6e6238ebbf61cbe9c83708eeca63ae2af@group.calendar.google.com',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
  });
  const events = results.data.items;
  if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return;
  }
  let out = "";
  events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      out += `${start} - ${event.summary}: `
  });
  res.status(200).json(ResponseUtil.success("Events fetched!", out));
} 