const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const multerUpload = require('../middlewares/multerUsers');
const createValidation = require('../validations/user/userCreateValidations');
const updateValidation = require('../validations/user/userUpdateValidations');
const loginValidations = require('../validations/user/loginValidations');
const validateToken = require('../middlewares/validateToken');





Router.get('/all', userController.getAllUsers);

Router.get('/detail/:id', userController.getUserDetail);


Router.get('/avatar/:userId', userController.getUserAvatar);

Router.put('/update/:id', [multerUpload.single('avatar'), updateValidation], userController.updateUser);

Router.post('/register', [multerUpload.single('avatar'), createValidation], userController.postRegisterUser);

Router.post('/login', loginValidations, userController.postLoginSession);

Router.post('/logout/:id', userController.postLogoutSession);

Router.get('/profile', validateToken, userController.getProfile);

Router.get('/verify', validateToken, userController.getVerifyToken);

Router.delete('/destroy/:id', userController.destroyUser);


module.exports = Router;