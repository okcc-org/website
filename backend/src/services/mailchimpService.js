const axios = require('axios');
const { ConflictError, InternalServerError } = require('../utils/CutstomError');

class MailchimpService {
    constructor() {
        this.apiKey = process.env.MAILCHIMP_API_KEY;
        this.serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
        this.listId = process.env.MAILCHIMP_LIST_ID;
        
        this.api = axios.create({
            baseURL: `https://${this.serverPrefix}.api.mailchimp.com/3.0`,
            auth: {
                username: 'anystring',
                password: this.apiKey
            }
        });
    }

    // Add email to newsletter subscription list
    async subscribe(email) {
        try {
            const response = await this.api.post(`/lists/${this.listId}/members`, {
                email_address: email,
                status: 'subscribed'
            });
            return response.data;
        } catch (error) {
            if (error.response?.data?.title === 'Member Exists') {
                throw ConflictError('Email already subscribed');
            }
            throw InternalServerError('Failed to subscribe to newsletter');
        }
    }

    // Send email to all subscribers
    async sendEmail(subject, content) {
        try {            
            // Create campaign
            const campaign = await this.api.post('/campaigns', {
                type: 'regular',
                recipients: {
                    list_id: this.listId
                },
                settings: {
                    subject_line: subject,
                    from_name: 'Orlando Korean Culture Center',
                    reply_to: 'hello@okccenter.com',
                    auto_footer: true
                }
            });
            
            // Set HTML content
            await this.api.put(`/campaigns/${campaign.data.id}/content`, {
                html: content
            });

            // Send campaign
            await this.api.post(`/campaigns/${campaign.data.id}/actions/send`);
            
            return campaign.data;
        } catch (error) {
            throw InternalServerError('Failed to send newsletter');
        }
    }
}

module.exports = new MailchimpService();