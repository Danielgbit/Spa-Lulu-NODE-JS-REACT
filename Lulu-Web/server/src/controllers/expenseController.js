const db = require('../database/models');


const expenseController = {
    
    postCreateExpenses: async (req, res) => {
        try {
            const newExpense = {
                description: req.body.description,
                payment_method: req.body.paymentMethod,
                category: req.body.category,
                date_time: req.body.dateTime,
                quantity: req.body.quantity,
            };

            const expenseCreation = await db.Expense.create(newExpense, { raw: true });

            if (!expenseCreation) return res.status(400).json({ message: 'error al crear el gasto' });

            res.status(201).json({ message: 'Campo registrado exitosamente' });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },

    getExpenses: async (req, res) => {
        try {
            const findAllExpenses = await db.Expense.findAll({ 
                raw: true, 
            });

            if (!findAllExpenses) return res.status(404).json({ message: 'No hay gastos registrados' });

            const expenseMap = findAllExpenses.map((expense) => ({
                expenseId: expense.expense_id,
                description: expense.description,
                paymentMethod: expense.payment_method,
                category: expense.category,
                dateTime: expense.date_time,
                quantity: expense.quantity,
            }));

            res.status(200).json({ expenses: expenseMap });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });

        }
    },

    getExpense: async (req, res) => {
        try {

            const id = req.params.id;

            const findExpense = await db.Expense.findByPk(id, { 
                raw: true
            });

            if(!findExpense) return res.status(404).json({ message: 'Expense not found' });

            const expenseObject = {
                expenseId: findExpense.expense_id,
                description: findExpense.description,
                paymentMethod: findExpense.payment_method,
                category: findExpense.category,
                dateTime: findExpense.date_time,
                quantity: findExpense.quantity,
            };

            res.status(200).json({ expenseDetail: expenseObject });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },

    putExpense: async (req, res) => {
        try {
            const id = req.params.id;

            const findExpense = await db.Expense.findByPk(id, { raw: true });

            if(!findExpense) return res.status(404).json({ message: 'Expense not found' });

            const updateExpense = {
                description: req.body.description,
                payment_method: req.body.paymentMethod,
                category: req.body.category,
                date_time: req.body.dateTime,
                quantity: req.body.quantity,
            };
            
            const [ rowsUpdate, expenseItemUpdate ] = await db.Expense.update(updateExpense, {
                where: {
                    expense_id: id
                }
            });

            if (rowsUpdate === 0) return res.status(400).json({ message: 'No se actualizo ninguna fila' });

            res.status(200).json({ message: 'successful expense update' });


        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },

    destroyExpense: async (req, res) => {
        try {
            const id = req.params.id;

            console.log(id);

            const findExpense = await db.Expense.findByPk(id, { raw: true });

            if(!findExpense) return res.status(404).json({ message: 'Expense not found' });

            const destroyGain = await db.Expense.destroy({
                where: {
                    expense_id: id
                }
            });

            if ( destroyGain === 0 ) return res.status(400).json({ message: 'No se elimino ningun gasto' })

            res.status(200).json({ message: 'successful delete expense' });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    }
};

module.exports = expenseController;