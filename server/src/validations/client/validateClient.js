const { body } = require('express-validator');

const validateClient = [

    body('first_name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),

  body('middle_name')
    .optional()
    .isLength({ max: 50 }).withMessage('El segundo nombre no puede exceder los 50 caracteres'),

  body('last_name')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),

  body('phone_number')
    .optional()
    .isMobilePhone().withMessage('Formato de número de teléfono no válido'),

  body('email')
    .optional()
    .isEmail().withMessage('Dirección de correo electrónico no válida'),

];

module.exports = validateClient;