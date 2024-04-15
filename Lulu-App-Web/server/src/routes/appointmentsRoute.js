const express = require('express');
const Router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const validateCreate = require('../validations/appointments/appointCreateValidations');
const validateUpdate = require('../validations/appointments/validateAppointUpdate');




// Appointment
Router.get('/all', appointmentsController.getAllAppointments);

Router.get('/detail/:id', appointmentsController.getAppointmentDetail);

Router.get('/detail/update/:id', appointmentsController.getAppointmentUpdate);

Router.post('/create', validateCreate, appointmentsController.postCreateAppointment);

Router.put('/update/:id', validateUpdate, appointmentsController.updateAppointment);

Router.delete('/destroy/:id', appointmentsController.destroyAppointment);

Router.get('/date', appointmentsController.getAppointByDate);

Router.get('/day', appointmentsController.getAppointByDay);

Router.get('/employee/:id', appointmentsController.getAppointByEmployee);

Router.get('/prueba/:id', appointmentsController.pruebaControl);








module.exports = Router;