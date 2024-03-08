const { body } = require('express-validator');

const appointmentsCreateValidation = [
    body('clientId')
    .notEmpty().withMessage('El campo de cliente no puede estar vacío.').bail()
    .isInt({ min: 1 }).withMessage('El campo client_id debe ser un número entero mayor que 0.'),

  body('serviceId')
    .notEmpty().withMessage('El campo servicio no puede estar vacío.').bail()
    .isInt({ min: 1 }).withMessage('El campo service_id debe ser un número entero mayor que 0.'),

  body('employeeId')
    .notEmpty().withMessage('El campo de empleado no puede estar vacío.').bail()
    .isInt({ min: 1 }).withMessage('El campo employee_id debe ser un número entero mayor que 0.'),

  body('status')
    .notEmpty().withMessage('El campo estado no puede estar vacío.').bail()
    .isString().withMessage('El campo debe ser una cadena de caracteres.').bail()
    .isLength({ max: 50 }).withMessage('El campo no puede tener más de 50 caracteres.'),

  body('reminder')
    .notEmpty().withMessage('El campo de recordar no puede estar vacío.').bail(),

  body('isPaid')
    .notEmpty().withMessage('El campo de pago no puede estar vacío.').bail(),
];

module.exports = appointmentsCreateValidation;