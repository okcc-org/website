const { google } = require('googleapis');
const { serverError } = require('../utils/CustomError');

class GoogleSheetsService {
    constructor() {
        this.auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive'
            ],
        });
        
        this.sheets = google.sheets({ version: 'v4', auth: this.auth });
        this.drive = google.drive({ version: 'v3', auth: this.auth });
    }

    async getOrCreateSheet(sheetId, sheetName, headers = ['Timestamp']) {
        try {
            
        
        } catch (error) {
            throw serverError("Failed to get or create sheet");
        }
    }

    // Add data to the sheet
    async appendData(sheetId, data) {
        try {
            
        } catch (error) {
            throw serverError("Failed to append data to the sheet");
        }
    }   
}

module.exports = GoogleSheetsService;