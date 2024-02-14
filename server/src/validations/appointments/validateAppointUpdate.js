const { body } = require('express-validator');

const validateAppoinUpdate = [
    body('client_id')
    .notEmpty().withMessage('El campo client_id no puede estar vacío.').bail()
    .isInt({ min: 1 }).withMessage('El campo client_id debe ser un número entero mayor que 0.'),

  body('service_id')
    .notEmpty().withMessage('El campo service_id no puede estar vacío.').bail()
    .isInt({ min: 1 }).withMessage('El campo service_id debe ser un número entero mayor que 0.'),

  body('employee_id')
    .notEmpty().withMessage('El campo employee_id no puede estar vacío.').bail()
    .isInt({ min: 1 }).withMessage('El campo employee_id debe ser un número entero mayor que 0.'),

  body('status')
    .notEmpty().withMessage('El campo status no puede estar vacío.').bail()
    .isString().withMessage('El campo status debe ser una cadena de caracteres.').bail()
    .isLength({ max: 50 }).withMessage('El campo status no puede tener más de 50 caracteres.'),

  body('reminder')
    .notEmpty().withMessage('El campo reminder no puede estar vacío.').bail()
    .isBoolean().withMessage('El campo reminder debe ser un valor booleano.'),

  body('is_paid')
    .notEmpty().withMessage('El campo is_paid no puede estar vacío.').bail()
    .isBoolean().withMessage('El campo is_paid debe ser un valor booleano.'),

  body('hour')
    .notEmpty().withMessage('El campo hour no puede estar vacío.').bail()
    .isString().withMessage('El campo hour debe ser una cadena de caracteres con formato de hora válido (por ejemplo, "14:30:10").'),

  body('month')
    .notEmpty().withMessage('El campo month no puede estar vacío.').bail()
    .isInt({ min: 1, max: 12 }).withMessage('El campo month debe ser un número entero entre 1 y 12.'),

  body('day')
    .notEmpty().withMessage('El campo day no puede estar vacío.').bail()
    .isInt({ min: 1, max: 31 }).withMessage('El campo day debe ser un número entero entre 1 y 31.'),
];

module.exports = validateAppoinUpdate;