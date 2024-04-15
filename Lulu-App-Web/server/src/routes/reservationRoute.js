const express = require('express');
const Router = express.Router();
const reservationController = require('../controllers/reservationController');



Router.get('/all', reservationController.getAllReservations);

Router.get('/detail/:id', reservationController.getReservationDetail);

Router.post('/create', reservationController.postCreateReservation);

Router.put('/update/:id', reservationController.updateReservation);

Router.delete('/destroy/:id', reservationController.destroyReservation);


module.exports = Router;


