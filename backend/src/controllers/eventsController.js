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

// Clean a single Google Calendar event into minimal display fields
function cleanEvent(event) {
  if (!event || typeof event !== "object") return null;

  const startRaw = event.start || {};
  const endRaw = event.end || {};

  // All‑day events use {date}; timed events use {dateTime}
  const isAllDay = Boolean(startRaw.date && !startRaw.dateTime);

  return {
    id: event.id || event.iCalUID || null,
    title: event.summary || "(No title)",
    description: (event.description || "").trim() || null,
    location: event.location || null,
    start: startRaw.dateTime || startRaw.date || null, // ISO or YYYY‑MM‑DD
    end: endRaw.dateTime || endRaw.date || null,       // ISO or YYYY‑MM‑DD
    isAllDay,
  };
}

// Clean an array of events
function cleanEvents(events) {
  if (!Array.isArray(events)) return [];
  return events.map(cleanEvent).filter(Boolean);
}


exports.getEvents = async (req, res, next) => {
  const auth = authorize();
  const calendar = google.calendar({version: 'v3', auth});
  const results = await calendar.events.list({
      calendarId: '6d6a2408cd2de42cb1a0cfeaa3af31a6e6238ebbf61cbe9c83708eeca63ae2af@group.calendar.google.com',
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
  });
  const events = results.data.items;
  const out = cleanEvents(events)
  
  res.status(200).json(ResponseUtil.success("Events fetched!", out));
} 