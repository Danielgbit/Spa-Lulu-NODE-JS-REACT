const { body } = require('express-validator');

const productUpdateValidation = [
    body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio.'),

    body('description')
    .notEmpty().withMessage('La descripción del producto es obligatoria.'),

    body('price')
    .notEmpty().withMessage('El precio del producto es obligatorio.')
    .isNumeric().withMessage('El precio del producto debe ser un valor numérico válido.'),

    body('categoryId')
    .notEmpty().withMessage('La categoría es obligatoria, Debes seleccionar una categoria.').bail()
    .isInt().withMessage('Debes seleccionar una categoria.'),

    body('image').custom((value, { req }) => {
        if (req.file && req.file.originalname.length > 0) {
            if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
                throw new Error('Formato no valido, sube un archivo de imagen jpg o png ');
            };
        }
        return true;
    })
];

module.exports = productUpdateValidation;