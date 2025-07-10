const { getProgram } = require("../models/classes");
const { ResponseUtil } = require("../utils/ResponseDTO");
const { NotFoundError } = require("../utils/CustomError");
const StripeService = require("../services/stripeService");

exports.registerClass = async (req, res, next) => {
    try {
        const { programType } = req.params;
        const { sheetName, level, ...formData } = req.body;

        const program = await getProgram(programType, level);
        if (!program) {
            throw NotFoundError('Program not found');
        }

        const session = await StripeService.createCheckoutSession(
            programType,
            level,
            program.price,
            program.sheetId,
            sheetName,
            formData
        );

        return res.status(200).json(new ResponseUtil('Payment successful', session.url));
    } catch (e) {
        next(e);
    }
}

exports.handleStripeWebhook = async (req, res, next) => {
    try {
        const signature = req.headers['stripe-signature'];
        
        if (!signature) {
            return res.status(400).json(
                new ResponseUtil('No signature found in request', null)
            );
        }

        const event = StripeService.constructEvent(req.body, signature);
        await StripeService.handleWebhookEvent(event);

        return res.status(200).json(new ResponseUtil('Webhook processed successfully', { received: true }));
    } catch (e) {
        next(e);
    }
};