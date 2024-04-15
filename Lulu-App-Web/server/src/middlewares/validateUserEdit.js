const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const db = require('../database/models');
const bcrypt = require('bcrypt');



const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({
            message: 'token not found, authorization denied'
        });
    };

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                message: 'invalid token'
            })
        };

        req.user = user;
    });

    try {

        const user = await db.User.findOne({
            where: {
                user_id: req.user.id
            }
        })

        if (!user) { return res.status(404).json({ message: 'usuario no encontrado' }); };

        const newPassword = req.body.password;

        if (newPassword || newPassword?.length > 0) {
            const compareSyncPassword = bcrypt.compareSync(newPassword, user.password);
            if(!compareSyncPassword) { return res.status(400).json({ message: 'la contraseña no coincide' }) }
        };

        next();

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        })
    }
};

module.exports = authUser;