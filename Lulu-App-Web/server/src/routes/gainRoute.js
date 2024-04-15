const express = require('express');
const Router = express.Router();
const gainController = require('../controllers/gainController');

Router.post('/create', gainController.postCreateGains);

Router.get('/all', gainController.getGains);

Router.get('/date', gainController.getGainByDate);

Router.get('/day', gainController.getGainByDay);

Router.get('/employee/:id', gainController.getGainByEmployee);

Router.get('/category', gainController.getGainByCategory);

Router.get('/type', gainController.getGainByMethodCheckout);

Router.get('/detail/:id', gainController.getGain);

Router.put('/update/:id', gainController.putGain);

Router.delete('/delete/:id', gainController.destroyGain);


module.exports = Router;