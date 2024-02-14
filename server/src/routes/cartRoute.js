const express = require('express');
const Router = express.Router();
const cartController = require('../controllers/cartController');


// Gets

Router.get('/all', cartController.getAllCart);

Router.get('/detail/:cartId', cartController.getCartDetail);

// Create

Router.post('/create/:userId', cartController.postCreateCart);

Router.post('/addProductInCart/:userId', cartController.postCreateProductInCart);

// Update


Router.put('/updateItemCart/:itemCartId', cartController.updateProductInCart);


// Destroy

Router.delete('/destroyCart/:cartId', cartController.destroyCart);

Router.delete('/destroyProductInCart/:itemId', cartController.destroyProductInCart);





module.exports = Router;