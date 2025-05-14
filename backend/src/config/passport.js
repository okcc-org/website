const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserByEmail, createUser } = require('../models');
const { UnauthorizedError } = require('../utils/CutstomError');

// for login
passport.use('google-login', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user exists
        const user = await findUserByEmail(profile.emails[0].value, 'google');
        
        if (!user) {
            return done(new UnauthorizedError('User not registered. Please sign up first.'), null);
        }
        
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// for signup
passport.use('google-signup', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_SIGNUP_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(profile.emails[0].value, 'google');
        
        if (existingUser) {
            return done(new ConflictError('User already exists'), null);
        }

        // Create new user
        const user = await createUser({
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: 'google',
            googleId: profile.id
        });
        
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport; 