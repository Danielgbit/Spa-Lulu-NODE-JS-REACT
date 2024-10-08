const { body } = require('express-validator');

const serviceCreateValidations = [
    body('serviceName')
        .notEmpty()
        .withMessage('El nombre del servicio es obligatorio').isLength({ max: 100 }),

    body('description')
        .notEmpty()
        .withMessage('La descripción del servicio es obligatoria'),

    body('durationMinutes')
        .notEmpty()
        .withMessage('La duración en minutos debe ser un número entero mayor que 0'),

    body('price')
        .notEmpty()
        .withMessage('El precio debe ser un número mayor o igual a 0'),

    body('categoryId')
        .notEmpty()
        .withMessage('El ID de categoría debe ser un número entero mayor que 0'),

    body('image').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('El archivo de imagen es obligatorio');
        }
        return true;
    }).custom((value, { req }) => {
        if (req.file && req.file.originalname.length > 0) {
            if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
                throw new Error('Formato no valido, sube un archivo de imagen jpg o png ');
            };
        }
        return true;
    })
];

module.exports = serviceCreateValidations;