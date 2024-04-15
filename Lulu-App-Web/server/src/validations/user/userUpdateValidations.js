const { body } = require('express-validator');

const userCreateValidation = [
    body('firstName')
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres.'),

  body('middleName')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 50 }).withMessage('El segundo nombre no debe exceder los 50 caracteres.'),

  body('lastName')
    .notEmpty().withMessage('El apellido es obligatorio.')
    .isLength({ max: 50 }).withMessage('El apellido no debe exceder los 50 caracteres.'),

  body('phoneNumber')
    .notEmpty().withMessage('El número de teléfono es obligatorio.')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Ingresa un número de teléfono móvil válido.'),

  body('email')
    .notEmpty().withMessage('El correo es obligatorio.').bail()
    .isEmail().withMessage('Debe ser un correo valido.'),

  body('city')
    .notEmpty().withMessage('La ciudad es obligatoria.')
    .isLength({ max: 50 }).withMessage('La ciudad no debe exceder los 50 caracteres.'),
    
];

module.exports = userCreateValidation;