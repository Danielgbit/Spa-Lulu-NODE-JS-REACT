const { body } = require('express-validator');

const validateClient = [

    body('firstName')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),

  body('middleName')
    .optional()
    .isLength({ max: 50 }).withMessage('El segundo nombre no puede exceder los 50 caracteres'),

  body('lastName')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),

  body('phoneNumber')
    .notEmpty().withMessage('El telefono es obligatorio').bail()
    .isMobilePhone().withMessage('Formato de número de teléfono no válido'),

  body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Dirección de correo electrónico no válida'),

];

module.exports = validateClient;