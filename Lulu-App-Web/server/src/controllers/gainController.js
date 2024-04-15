const { Op } = require('sequelize');
const db = require('../database/models');
const { startOfDay, endOfDay } = require('date-fns');

const gainController = {

    postCreateGains: async (req, res) => {
        try {
            const newItemGain = {
                employee_id: req.body.employeeId,
                date_time: req.body.dateTime,
                amount: req.body.amount,
                type: req.body.type,
                category: req.body.category,
                description: req.body.description,
            };

            const itemGainCreate = await db.Gain.create(newItemGain, { raw: true });

            if (!itemGainCreate) return res.status(400).json({ message: 'error al crear el item' });

            res.status(201).json({ message: 'Registro exitoso' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },

    getGains: async (req, res) => {
        try {
            const gainItems = await db.Gain.findAll({ 
                include: 'gainEmployee',
                raw: true, 
                nest: true
            });

            if (!gainItems) return res.status(404).json({ message: 'No se encontraron ganancias' });

            const gainMap = gainItems.map((item) => ({
                gainId: item.gain_id,
                employeeId: item.employee_id,
                employeeName: item.gainEmployee.full_name,
                dateTime: item.date_time,
                amount: item.amount,
                type: item.type,
                category: item.category,
                description: item.description,
            }));

            res.status(200).json({ gains: gainMap });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });

        }
    },

    getGainByDate: async (req, res) => {
        try {

            const { start, end } = req.query;

            const startTime = startOfDay(start);
            const endTime = endOfDay(end);


            const gainsByDate = await db.Gain.findAll({ 
                where: {
                    date_time: {
                        [Op.between]: [startTime, endTime]
                    }
                },
                include: 'gainEmployee',
                raw: true, 
                nest: true
            });

            if (!gainsByDate) return res.status(404).json({ message: 'No se encontraron ganancias en este rango de fechas' });

            const gainMap = gainsByDate.map((item) => ({
                gainId: item.gain_id,
                employeeId: item.employee_id,
                employeeName: item.gainEmployee.full_name,
                dateTime: item.date_time,
                amount: item.amount,
                type: item.type,
                category: item.category,
                description: item.description,
            }));

            res.status(200).json({ gains: gainMap });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });

        }
    },

    getGainByEmployee: async (req, res) => {
        try {
            const { id } = req.params;

            const findGainsByEmployee = await db.Gain.findAll({
                where: {
                    employee_id: id
                },
                include: [{
                    model: db.Employee,
                    as: 'gainEmployee',
                    attributes : ['full_name']
                }],
                raw: true, 
                nest: true
            });

            if (!findGainsByEmployee) return res.status(404).json({ message: 'No se encontraron ganancias en este rango de fechas' });

            const gainMap = findGainsByEmployee.map((item) => ({
                gainId: item.gain_id,
                employeeId: item.employee_id,
                employeeName: item.gainEmployee.full_name,
                dateTime: item.date_time,
                amount: item.amount,
                type: item.type,
                category: item.category,
                description: item.description,
            }));

            res.status(200).json({ gains: gainMap });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });

        }
    },

    getGainByCategory: async (req, res) => {
        try {
            const { name } = req.query;

            const findGainsByEmployee = await db.Gain.findAll({
                where: {
                    category: name
                },
                include: [{
                    model: db.Employee,
                    as: 'gainEmployee',
                    attributes : ['full_name']
                }],
                raw: true, 
                nest: true
            });

            if (!findGainsByEmployee) return res.status(404).json({ message: 'No se encontraron ganancias en este rango de fechas' });

            const gainMap = findGainsByEmployee.map((item) => ({
                gainId: item.gain_id,
                employeeId: item.employee_id,
                employeeName: item.gainEmployee.full_name,
                dateTime: item.date_time,
                amount: item.amount,
                type: item.type,
                category: item.category,
                description: item.description,
            }));

            res.status(200).json({ gains: gainMap });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });

        }
    },

    getGainByMethodCheckout: async (req, res) => {
        try {
            const { method } = req.query;

            const findGainsByEmployee = await db.Gain.findAll({
                where: {
                    type: method
                },
                include: [{
                    model: db.Employee,
                    as: 'gainEmployee',
                    attributes : ['full_name']
                }],
                raw: true, 
                nest: true
            });

            if (!findGainsByEmployee) return res.status(404).json({ message: 'No se encontraron ganancias en este rango de fechas' });

            const gainMap = findGainsByEmployee.map((item) => ({
                gainId: item.gain_id,
                employeeId: item.employee_id,
                employeeName: item.gainEmployee.full_name,
                dateTime: item.date_time,
                amount: item.amount,
                type: item.type,
                category: item.category,
                description: item.description,
            }));

            res.status(200).json({ gains: gainMap });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });

        }
    },

    getGainByDay: async (req, res) => {
        try {

            const { date } = req.query;

            const startDate = startOfDay(date);
            const endDate = endOfDay(date);

            const gainsByDay = await db.Gain.findAll({ 
                where: {
                    date_time: {
                        [Op.between]: [startDate, endDate] 
                    }
                },
                include: 'gainEmployee',
                raw: true, 
                nest: true
            });

            if (!gainsByDay) return res.status(404).json({ message: 'No se encontraron ganancias en este rango de fechas' });

            const gainMap = gainsByDay.map((item) => ({
                gainId: item.gain_id,
                employeeId: item.employee_id,
                employeeName: item.gainEmployee.full_name,
                dateTime: item.date_time,
                amount: item.amount,
                type: item.type,
                category: item.category,
                description: item.description,
            }));

            res.status(200).json({ gains: gainMap });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },
    
    getGain: async (req, res) => {
        try {

            const id = req.params.id;

            const findGain = await db.Gain.findByPk(id, { 
                include: ['gainEmployee'],
                nest: true,
                raw: true
            });

            if(!findGain) return res.status(404).json({ message: 'Gain not found' });

            const gainObject = {
                gainId: findGain.gain_id,
                employeeId: findGain.employee_id,
                employeeName: findGain.gainEmployee.full_name,
                dateTime: findGain.date_time,
                amount: findGain.amount,
                type: findGain.type,
                category: findGain.category,
                description: findGain.description,
            };

            res.status(200).json({ gainDetail: gainObject });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },

    putGain: async (req, res) => {
        try {
            const id = req.params.id;

            const findGain = await db.Gain.findByPk(id, { raw: true });

            if(!findGain) return res.status(404).json({ message: 'Gain not found' });

            const updateGain = {
                employee_id: req.body.employeeId,
                date_time: req.body.dateTime,
                amount: req.body.amount,
                type: req.body.type,
                category: req.body.category,
                description: req.body.description,
            };
            
            const [ rowsUpdate, inventoryItemUpdate ] = await db.Gain.update(updateGain, {
                where: {
                    gain_id: id
                }
            });

            if (rowsUpdate === 0) return res.status(400).json({ message: 'No se actualizo ninguna fila' });

            res.status(200).json({ message: 'successful profit creation' });


        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },

    destroyGain: async (req, res) => {
        try {
            const { id } = req.params;

            const findGain= await db.Gain.findByPk(id, { raw: true });

            if(!findGain) return res.status(404).json({ message: 'Gain not found' });

            const destroyGain = await db.Gain.destroy({
                where: {
                    gain_id: id
                }
            });

            console.log(destroyGain);

            res.status(200).json({ message: 'successful delete entry' });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    }
};

module.exports = gainController;

