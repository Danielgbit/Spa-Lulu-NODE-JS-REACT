const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');


const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
    return res.status(400).json({ message: 'token not found, authorization denied' });
    };

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) { res.status(403).json({ message: 'invalid token' }) };

        req.user = user;

        next();
    });
};

module.exports = authRequired;