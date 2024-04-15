const express = require('express');
const Router = express.Router();
const expenseController = require('../controllers/expenseController');


Router.post('/create', expenseController.postCreateExpenses);

Router.get('/all', expenseController.getExpenses);

Router.get('/detail/:id', expenseController.getExpense);

Router.put('/update/:id', expenseController.putExpense);

Router.delete('/delete/:id', expenseController.destroyExpense);

module.exports = Router;