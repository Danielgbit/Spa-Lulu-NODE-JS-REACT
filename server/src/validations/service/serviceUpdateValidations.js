const { body } = require('express-validator');

const serviceUpdateValidations = [
    body('service_name')
        .notEmpty()
        .withMessage('El nombre del servicio es obligatorio'),

    body('description')
        .notEmpty()
        .withMessage('La descripción del servicio es obligatoria'),

    body('duration_minutes')
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage('La duración en minutos debe ser un número entero mayor que 0'),

    body('price')
        .notEmpty().withMessage('Debes ingresar un precio').bail()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número mayor o igual a 0'),

    body('category_id')
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage('El ID de categoría debe ser un número entero mayor que 0'),

    body('image').custom((value, { req }) => {
        if (req.file && req.file.originalname.length > 0) {
            if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
                throw new Error('Formato no valido, sube un archivo de imagen jpg o png ');
            };
        }
        return true;
    })
];

module.exports = serviceUpdateValidations;