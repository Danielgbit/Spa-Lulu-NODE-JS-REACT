const express = require('express');
const Router = express.Router();
const clientController = require('../controllers/clientController');
const validateClient = require('../validations/client/validateClient'); 




// Gets
Router.get('/all', clientController.getAllClients);
Router.get('/detail/:id', clientController.getClientDetail);

// Create
Router.post('/create', validateClient, clientController.postCreateClient);

// Update
Router.put('/update/:id', validateClient, clientController.updateClient);

// Destroy
Router.delete('/destroy/:id', clientController.destroyClient);

Router.get('/search', clientController.getClientByBirthdate);



module.exports = Router;