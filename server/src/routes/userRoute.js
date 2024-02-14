const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const multerUpload = require('../middlewares/multerUsers');
const createValidation = require('../validations/user/userCreateValidations');
const updateValidation = require('../validations/user/userUpdateValidations');




Router.get('/all', userController.getAllUsers);

Router.get('/detail/:id', userController.getUserDetail);

Router.get('/avatar/:userId', userController.getUserAvatar);

Router.put('/update/:id', [multerUpload.single('avatar'), updateValidation], userController.updateUser);

Router.post('/register', [multerUpload.single('avatar'), createValidation], userController.postRegisterUser);

Router.post('/login', userController.postLoginSession);

Router.delete('/destroy/:id', userController.destroyUser);


module.exports = Router;