const { createUser, findUserByEmail } = require('../models');
const bcrypt = require('bcrypt');
const { ConflictError, UnauthorizedError } = require('../utils/CutstomError');
const { ResponseUtil } = require('../utils/ResponseDTO');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.register = async (req, res, next) => {
    try {
        const { email, password, validatePassword, name } = req.body;

        // Check duplicate email
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw ConflictError('Email already exists');
        }

        // Check password
        if (password !== validatePassword) {
            throw ConflictError('Passwords do not match');
        }

        // Check password length
        if (password.length < 8) {
            throw ConflictError('Password must be at least 8 characters long');
        }

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({
            email,
            password: hashedPassword,
            name,
        });

        // Exclude password from response
        const { password:_, ...userWithoutPassword } = user;

        return res.status(201).json(
            ResponseUtil.success('Registration completed successfully', userWithoutPassword)
        );

    } catch (e) {
        next(e);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await findUserByEmail(email);
        if (!user) {
            throw UnauthorizedError('Invalid email');
        }   

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw UnauthorizedError('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        // Exclude password from response
        const { password:_, ...userWithoutPassword } = user;

        return res.status(200).json(
            ResponseUtil.success('Login successful', { user: userWithoutPassword, token })
        );

    } catch (e) {
        next(e);
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.status(200).json(
            ResponseUtil.success('Logout successful')
        );
    } catch (e) {
        next(e);
    }
}

exports.googleAuth = (req, res, next) => {
    passport.authenticate('google-login', {
        scope: ['profile', 'email'],
        session: false
    })(req, res, next);
};

exports.googleCallback = async (req, res, next) => {
    passport.authenticate('google-login', { session: false }, async (err, user) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(UnauthorizedError('Google authentication failed'));
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    role: user.role,
                },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            // Exclude password from response
            const { password:_, ...userWithoutPassword } = user;

            // Redirect to frontend with token
            // redirect url should be modified
            res.redirect('http://localhost:8080/');
        } catch (error) {
            next(error);
        }
    })(req, res, next);
};

exports.googleSignup = (req, res, next) => {
    passport.authenticate('google-signup', {
        scope: ['profile', 'email'],
        session: false
    })(req, res, next);
};

exports.googleSignupCallback = async (req, res, next) => {
    passport.authenticate('google-signup', { session: false }, async (err, user) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(UnauthorizedError('Google signup failed'));
            }

            // Exclude password from response
            const { password:_, ...userWithoutPassword } = user;

            // Redirect to frontend with token
            // redirect url should be modified
            res.redirect(`${process.env.FRONTEND_URL}/auth/google/signup/callback?user=${JSON.stringify(userWithoutPassword)}`);
        } catch (error) {
            next(error);
        }
    })(req, res, next);
};
