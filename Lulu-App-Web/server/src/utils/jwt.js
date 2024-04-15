const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');


module.exports = {
        createAccessToken : (payload) => {
            return new Promise((resolve, reject) => {
                    const expirationTime = Math.floor(Date.now() / 1000) + (30 * 60);
                    jwt.sign(payload, JWT_SECRET, { expiresIn: expirationTime }, (error, token) => {
        
                        if (error) reject(error)
                        resolve(token)
                    });
                });
        },
}    


