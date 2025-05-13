const { ResponseUtil } = require("../utils/ResponseDTO");
const { BadRequestError } = require("../utils/CutstomError");
const mailchimpService = require("../services/mailchimpService");

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw BadRequestError('Email is required');
        }

        if (!isValidEmail(email)) {
            throw BadRequestError('Invalid email');
        }
        const subscribe = await mailchimpService.subscribe(email);

        res.status(201).json(ResponseUtil.success(subscribe));
    } catch (e) {
        next(e);
    }
}

exports.sendEmail = async (req, res, next) => {
    try {
        const { subject, content } = req.body;
        const result = await mailchimpService.sendEmail(subject, content);
        res.status(200).json(ResponseUtil.success(result));
    } catch (e) {
        next(e);
    }
}


