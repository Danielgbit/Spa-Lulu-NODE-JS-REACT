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

Router.get('/images/:id', productsController.getProductImages);

Router.get('/image/:id', productsController.getServiceImage);

Router.post('/create', [multerUpload, createValidation], productsController.postCreateProduct);

/* Router.put('/update/:id', [multerUpload.single('image'), updateValidation], productsController.updateProduct); */

Router.delete('/destroy/:id', productsController.destroyProduct);

Router.get('/price/descending', productsController.getProductsByPriceDescending);

Router.get('/price/ascending', productsController.getProductsByPriceAscendent);






module.exports = Router;