const db = require('../database/models');
/* const {
    validationResult
} = require('express-validator'); */


const employeeController = {
        //Employee

        getAllEmployees: async (req, res) => {

            try {
                const allEmployees = await db.Employee.findAll({
                    raw: true,
                    nest: true
                });

    
                if (!allEmployees || allEmployees.length === 0) {
                    return res.status(400).json({
                        error: 'No hay empleados registrados',
                        success: false
                    });
                    
                };

                const employeeElementsMap = allEmployees.map((employee) => ({
                    employeeId: employee.employee_id,
                    fullName: employee.full_name,
                    phoneNumber: employee.phone_number,
                    email: employee.email,
                    position: employee.position,
                    biography: employee.biography,
                }));
    
    
    
                res.status(200).json({
                    allEmployees: employeeElementsMap
                });
    
            } catch (error) {
                res.status(500).json({
                    errorServer: 'Error interno del servidor'
                })
                console.error(error);
            };
    
        },

        getEmployeeDetail: async (req, res) => {

            try {
                const { id } = req.params;

                const employee = await db.Employee.findByPk(id, { raw: true });
    
                if (!employee) {
                    res.status(400).json({
                        error: 'No hay empleados registrados',
                        success: false
                    });
                };

                const employeeDetail = {
                    employeeId: employee.employee_id,
                    fullName: employee.full_name,
                    phoneNumber: employee.phone_number,
                    email: employee.email,
                    position: employee.position,
                    biography: employee.biography,
                };
    
    
    
                res.status(200).json({
                    employeeDetail: employeeDetail
                });
    
            } catch (error) {
                res.status(500).json({
                    errorServer: 'Error interno del servidor'
                })
                console.error(error);
            };
    
        },
    
        destroyEmployee: async (req, res) => {
            try {
                const employeeId = req.params.id;
        
                const destroyEmployee = await db.Employee.destroy({
                    where: {
                        employee_id: employeeId
                    }
                });
        
                if (!destroyEmployee) {
                    return res.status(500).json({
                        success: false,
                        error: "Error interno, no se eliminó la cita",
                    });
                }
        
                res.status(200).json({
                    success: true,
                    message: "Empleado eliminado exitosamente",
                });
    
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    error: 'Error interno del servidor'
                });
            }
        },
    
        postCreateEmployee: async (req, res) => {
    
            try {
    
                const { fullName, phoneNumber, email, position, biography } = req.body;
                
                const newEmployee = {
                    full_name: fullName,
                    phone_number: phoneNumber,
                    email: email,
                    position: position,
                    biography: biography
                };
        
                const createEmployee = await db.Employee.create(newEmployee, { raw: true });
    
                res.status(201).json({ success: true, message: 'Empleado Creado exitosamente' });
    
            } catch (error) {
                console.error(error);   
            }
        },

        putUpdateEmployee: async (req, res) => {
    
            try {

                const { id } = req.params;
    
                const { fullName, phoneNumber, email, position, biography } = req.body;
                
                const updateEmployee = {
                    full_name: fullName,
                    phone_number: phoneNumber,
                    email: email,
                    position: position,
                    biography: biography
                };
        
                const [ rowsUpdate, employeUpdate ] = await db.Employee.update(updateEmployee, {
                    where: {
                        employee_id: id
                    },
                });

                console.log(rowsUpdate);
    
                res.status(200).json({ success: true, message: 'Empleado actualizado exitosamente' });
    
            } catch (error) {
                console.error(error);   
            }
        }   
    
};

module.exports = employeeController;