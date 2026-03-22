const session = require('express-session');

const sessionConfig = session({
    name: 'sessionId', 

    secret: process.env.SESSION_SECRET || 'dev-secret',

    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    }
});

module.exports = sessionConfig;