const jwt = require('jsonwebtoken');

/* const authToken = (req, res, next) => {

    const token = req.session.token;

    if (token) {
        jwt.verify(token, '@asdjasdla_!/(7slDfvc##1335da)=)767', (error, decoded) => {
            if (error) {
                res.status(401).json({ sucess: false, error: 'Token no válido'});
            };
            const user = decoded;
            res.status(200).json({ sucess: true, user: user});
        });
    };

      
};

module.exports = authToken; */