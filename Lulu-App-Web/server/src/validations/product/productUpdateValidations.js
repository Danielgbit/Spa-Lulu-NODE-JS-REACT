const { body } = require('express-validator');

const productUpdateValidation = [
    body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio.'),

    body('description')
    .notEmpty().withMessage('La descripción del producto es obligatoria.'),

    body('price')
    .notEmpty().withMessage('El precio del producto es obligatorio.'),

    body('categoryId')
    .notEmpty().withMessage('La categoría es obligatoria, Debes seleccionar una categoria.').bail()
    .isInt().withMessage('Debes seleccionar una categoria.'),
];

module.exports = productUpdateValidation;