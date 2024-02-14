const { body } = require('express-validator');

const userCreateValidation = [
    body('first_name')
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres.'),

  body('middle_name')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 50 }).withMessage('El segundo nombre no debe exceder los 50 caracteres.'),

  body('last_name')
    .notEmpty().withMessage('El apellido es obligatorio.')
    .isLength({ max: 50 }).withMessage('El apellido no debe exceder los 50 caracteres.'),

  body('phone_number')
    .notEmpty().withMessage('El número de teléfono es obligatorio.')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Ingresa un número de teléfono móvil válido.'),

  body('email')
    .notEmpty().withMessage('El correo es obligatorio.')
    .isEmail().withMessage('Debe ser un correo valido.'),

  body('city')
    .notEmpty().withMessage('La ciudad es obligatoria.')
    .isLength({ max: 50 }).withMessage('La ciudad no debe exceder los 50 caracteres.'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/)
    .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'),

    body('avatar').custom((value, { req }) => {
        if (!req.file || !req.file.filename) {
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

module.exports = userCreateValidation;