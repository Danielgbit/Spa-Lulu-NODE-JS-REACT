const express = require('express');
const Router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const validateCreate = require('../validations/appointments/appointCreateValidations');
const validateUpdate = require('../validations/appointments/validateAppointUpdate');




// Gets
Router.get('/all', appointmentsController.getAllAppointments);

Router.get('/employees/all', appointmentsController.getAllEmployees);

Router.get('/availabilities/:id', appointmentsController.getAvailabilityEmployee);

Router.get('/detail/:id', appointmentsController.getAppointmentDetail);

// Create
Router.post('/create', validateCreate, appointmentsController.postCreateAppointment);

// Update
Router.put('/update/:id', validateUpdate, appointmentsController.updateAppointment);

// Destroy
Router.delete('/destroy/:id', appointmentsController.destroyAppointment);


module.exports = Router;