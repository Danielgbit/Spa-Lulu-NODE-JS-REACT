const express = require('express');
const Router = express.Router();
const employeeController = require('../controllers/employeeController');


//Employee

Router.get('/all', employeeController.getAllEmployees);

Router.get('/detail/:id', employeeController.getEmployeeDetail);

Router.delete('/destroy/:id', employeeController.destroyEmployee);

Router.post('/create/', employeeController.postCreateEmployee);

Router.put('/update/:id', employeeController.putUpdateEmployee);



module.exports = Router;