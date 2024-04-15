const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');


const authRequiredAdmin = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({ message: 'token not found, authorization denied' });
    };

    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) { res.status(403).json({ message: 'invalid token' }) };

        req.token = token;
        next();
    });
};

module.exports = authRequiredAdmin;