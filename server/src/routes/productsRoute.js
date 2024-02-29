const express = require('express');
const Router = express.Router();
const productsController = require('../controllers/productsController');
const multerUpload = require('../middlewares/multerProduct');
const createValidation = require('../validations/product/productCreateValidations');
const updateValidation = require('../validations/product/productUpdateValidations');



Router.get('/all', productsController.getAllProducts);

Router.get('/categories/all', productsController.getAllCategories);

Router.get('/search', productsController.getSearchProducts);

Router.get('/category/:id', productsController.getCategoryProducts);

Router.get('/detail/:id', productsController.getProductDetail);

Router.get('/image/:productId', productsController.getProductImage);

Router.post('/create', [multerUpload.single('image'), createValidation] ,productsController.postCreateProduct);

Router.put('/update/:id', [multerUpload.single('image'), updateValidation], productsController.updateProduct);

Router.delete('/destroy/:id', productsController.destroyProduct);




module.exports = Router;