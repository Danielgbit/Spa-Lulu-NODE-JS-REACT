const { body } = require('express-validator');

const loginValidations = [

  body('email')
    .notEmpty().withMessage('El correo es obligatorio.').bail()
    .isEmail().withMessage('Debe ser un correo valido.'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
];

module.exports = loginValidations;