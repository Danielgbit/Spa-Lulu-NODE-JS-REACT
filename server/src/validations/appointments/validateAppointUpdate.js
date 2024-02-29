const {
  body
} = require('express-validator');

const validateAppoinUpdate = [
  body('clientId')
  .notEmpty().withMessage('Debes seleccionar un cliente.'),

  body('serviceId')
  .notEmpty().withMessage('Debes seleccionar un servicio.'),

  body('employeeId')
  .notEmpty().withMessage('Debes selecciona un empleado.'),

  body('status')
  .notEmpty().withMessage('El campo estado no puede estar vacío.').bail()
  .isString().withMessage('El campo debe ser una cadena de caracteres.').bail()
  .isLength({
    max: 50
  }).withMessage('El campo no puede tener más de 50 caracteres.'),

  body('reminder')
  .notEmpty().withMessage('El campo de recordar no puede estar vacío.').bail(),

  body('isPaid')
  .notEmpty().withMessage('El campo de pago no puede estar vacío.').bail(),

  body('hour')
  .notEmpty().withMessage('El campo hora no puede estar vacío.').bail()
  .isString().withMessage('El campo hora debe ser una cadena de caracteres con formato de hora válido (por ejemplo, "14:30:10").'),

  body('month')
  .notEmpty().withMessage('El campo mes no puede estar vacío.').bail(),

  body('day')
  .notEmpty().withMessage('El campo dia no puede estar vacío.').bail()
  .isInt({
    min: 1,
    max: 31
  }).withMessage('El campo dia debe ser un número entero entre 1 y 31.'),
];

module.exports = validateAppoinUpdate;