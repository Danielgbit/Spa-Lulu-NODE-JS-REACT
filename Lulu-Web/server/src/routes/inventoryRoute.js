const express = require('express');
const Router = express.Router();
const inventoryController = require('../controllers/inventoryController');


Router.post('/create', inventoryController.postCreateInventory);

Router.get('/items', inventoryController.getInventories);

Router.get('/item/:id', inventoryController.getInventoryItem);

Router.put('/update/:id', inventoryController.putInventory);

Router.delete('/delete/:id', inventoryController.destroyInventory);




module.exports = Router;