const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const { BadRequestError } = require('../utils/CustomError');

class StripeService {
    static async createCheckoutSession(programType, subProgram, price, sheetId, sheetName, formData) {
        // calculate total price with service fee
        const totalPrice = Math.round((price * 100) * 1.0029 + 30, 2); 

        return await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                name: `${programType} - ${subProgram}`,
                description: `Price included service fee`,
                amount: totalPrice,
                currency: 'usd',
                quantity: 1,
            }],
            success_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            metadata: {
                programType,
                subProgram,
                sheetId,
                sheetName,
                ...formData,
            }
        });
    }

    static async handleWebhookEvent(event) {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const { programType, subProgram, sheetId, sheetName, ...formData } = session.metadata;
                
                // TODO: 1. Implement logic to handle after payment is successful here
                // 2. Email to customer
                // 3. Google Sheet Update

                console.log('Payment successful:', {
                    programType,
                    subProgram,
                    formData,
                    amount: session.amount_total,
                    customerEmail: session.customer_details.email
                });
                break;
            
            case 'checkout.intent.payment_failed':
                throw BadRequestError('Payment failed');
                
            case 'checkout.session.expired':
                throw BadRequestError('Payment session expired');

            default: 
                throw BadRequestError(`Unhandled event type ${event.type}`);
        }
    }

    static constructEvent(payload, signature) {
        return stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    }
}

module.exports = StripeService; 