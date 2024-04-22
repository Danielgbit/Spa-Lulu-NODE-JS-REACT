const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const multerUpload = require('../middlewares/multerUsers');
const createValidation = require('../validations/user/userCreateValidations');
const updateValidation = require('../validations/user/userUpdateValidations');
const loginValidations = require('../validations/user/loginValidations');
const validateToken = require('../middlewares/validateToken');
const validateTokenAdmin = require('../middlewares/validateTokenAdmin');
const sharpUser = require('../middlewares/sharpUserMiddleware');








Router.get('/all', userController.getAllUsers);

Router.get('/detail/:id', userController.getUserDetail);

Router.get('/avatar/:userId', userController.getUserAvatar);

Router.put('/update/password', validateToken, userController.passwordUpdate);

Router.post('/delete', validateToken, userController.deleteUserAuth);

Router.put('/update', [multerUpload.single('avatar'), sharpUser, updateValidation, validateToken], userController.updateUser);

Router.post('/register', [multerUpload.single('avatar'), sharpUser, createValidation], userController.postRegisterUser);

Router.post('/login', loginValidations, userController.postLoginSession);

Router.post('/login/admin', loginValidations, userController.postLoginAdmin);

Router.post('/logout/:id', userController.postLogoutSession);

Router.get('/profile', validateToken, userController.getProfile);

Router.get('/verify', validateToken, userController.getVerifyToken);

Router.get('/verify/admin', validateTokenAdmin, userController.getVerifyTokenAdmin);

Router.get('/length/All', userController.getLengthUsers);

Router.get('/shopping/history/:id', userController.getShoppingHistory);





module.exports = Router;