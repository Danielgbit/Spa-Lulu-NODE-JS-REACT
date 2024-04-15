const { body } = require('express-validator');

const productCreateValidation = [
    body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio.'),

    body('description')
    .notEmpty().withMessage('La descripción del producto es obligatoria.').bail()
    .isLength({ min: 30, max:140 }).withMessage('La descripción debe ser minimo 20 caracter y maximo 140.'),

    body('price')
    .notEmpty().withMessage('El precio del producto es obligatorio.').bail(),

    body('categoryId')
    .notEmpty().withMessage('La categoría es obligatoria, Debes seleccionar una categoria.').bail()
    .isInt().withMessage('Debes seleccionar una categoria.'),
];

module.exports = productCreateValidation;