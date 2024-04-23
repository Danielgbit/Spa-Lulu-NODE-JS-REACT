const crypto = require('crypto');

const generateToken = (req, res, next) => {
    req.crypto = crypto.randomBytes(20).toString('hex');
    next();
}

module.exports = generateToken;