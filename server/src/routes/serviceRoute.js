const express = require('express');
const Router = express.Router();
const serviceController = require('../controllers/servicesController');
const multerUpload = require('../middlewares/multerServices');
const createValidations = require('../validations/service/serviceCreateValidations');
const updateValidations = require('../validations/service/serviceUpdateValidations');



Router.get('/all', serviceController.getAllServices);

Router.get('/category/:id', serviceController.getCategoryServices);

Router.get('/detail/:id', serviceController.getServiceDetail);

Router.get('/image/:serviceId', serviceController.getServiceImage);

Router.post('/create', [multerUpload.single('image'), createValidations], serviceController.postCreateService);

Router.put('/update/:id', [multerUpload.single('image'), updateValidations], serviceController.updateService);

Router.delete('/destroy/:id', serviceController.destroyService);


module.exports = Router;


