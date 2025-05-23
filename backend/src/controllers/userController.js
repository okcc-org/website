const { findUserById, updateUserById, findUserByEmail, changePasswordById } = require('../models/user');
const { ResponseUtil } = require('../utils/ResponseDTO');
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../utils/CustomError');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res, next) => {
    try {
        console.log(req.user.id);
        const userId = req.user.id;
        const user = await findUserById(userId);
        
        if (!user) {
            throw NotFoundError("User not found");
        }

        const { password:_, ...userWithoutPassword } = user;
        return res.status(200).json(ResponseUtil.success("User fetched successfully", userWithoutPassword));
    } catch (e) {
        next(e);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { fullName, phone, address } = req.body;

        // Initialize the updateData object
        const updateData = {};

        // Check if the field exists and add it to the updateData object
        if (fullName !== undefined) {
            updateData.fullName = fullName;
        }
        if (phone !== undefined) {
            updateData.phone = phone;
        }
        if (address !== undefined) {
            if (!address.address1 || !address.city || !address.state || !address.zipcode) {
                throw BadRequestError("Address must include address1, city, state, and zipcode");
            }
            updateData.address = {
                upsert: {
                    create: address,
                    update: address
                }
            };
        }

        // If no fields to update, return error
        if (Object.keys(updateData).length === 0) {
            throw BadRequestError("No fields to update");
        }

        const user = await updateUserById(userId, updateData);
        const { password:_, ...userWithoutPassword } = user;

        return res.status(200).json(ResponseUtil.success("User info updated successfully", userWithoutPassword));
    } catch (e) {
        next(e);
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userEmail = req.user.email;
        const { currentPassword, newPassword, newConfirmPassword } = req.body;
        
        // Check if user is google user
        if (req.user.provider === 'google') {
            throw BadRequestError("Google user cannot change password");
        }

        const currentUser = await findUserByEmail(userEmail);
        if (!currentUser) {
            throw NotFoundError("User not found");
        }

        // Check current password is valid
        const isPasswordValid = await bcrypt.compare(currentPassword, currentUser.password);
        if (!isPasswordValid) {
            throw UnauthorizedError("Current password is invalid");
        }

        // Check new password and new confirm password are the same
        if (newPassword !== newConfirmPassword) {
            throw BadRequestError("New password and new confirm password are not the same");
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await changePasswordById(userId, hashedPassword);
        const { password:_, ...userWithoutPassword } = user;

        return res.status(200).json(ResponseUtil.success("Password successfully changed", userWithoutPassword));
    } catch (e) {
        next(e);
    }
}