const express = require('express');
const Router = express.Router();
const cartController = require('../controllers/cartController');


// Gets

Router.get('/all', cartController.getAllCart);

Router.get('/detail/:userId', cartController.getCartDetail);

// Create

Router.post('/create/:userId', cartController.postCreateCart);

Router.post('/add/:userId', cartController.postCreateProductInCart);

// Update


Router.put('/updateItemCart/:itemCartId', cartController.updateProductInCart);


// Destroy

Router.delete('/destroyCart/:cartId', cartController.destroyCart);

Router.delete('/destroyProductInCart/:itemId', cartController.destroyProductInCart);

Router.post('/empty', cartController.emptyCart);






module.exports = Router;