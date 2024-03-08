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



module.exports = Router;