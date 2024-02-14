const db = require('../database/models');
const { validationResult } = require('express-validator');


const clientController = {

    getAllClients: async (req, res) => {

        try {
            const allclient = await db.Client.findAll({
                include: 'clientAppointment',
                raw: true,
                nest: true
            });

            if (!allclient || allclient.length === 0 || allclient === null) {
                res.status(400).json({
                    error: 'No se encontro la cita'
                })
            };

            const clientElementsMap = allclient.map((client) => ({
                clientId : client.client_id,
                fullName: `${client.first_name} ${client.middle_name} ${client.last_name}`,
                phoneNumber: client.phone_number,
                email: client.email,
                clientDetail: `http://localhost:4000/client/detail/${client.client_id}`,
            }));

            res.status(200).json({
                allClients: clientElementsMap,
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'Error interno del servidor'
            })
            console.error(error);
        };

    },

    getClientDetail: async (req, res) => {

        try {

            const clientId = req.params.id;

            const client = await db.Client.findByPk(clientId, {
                include: 'clientAppointment',
                raw: true,
                nest: true
            });

            if (!client || client.length === 0 || client === null) {
                res.status(400).json({
                    sucess: false,
                    error: 'No se encontro la cita'
                });
            };

            const service = await db.Service.findByPk(client.clientAppointment.service_id, {
                raw: true,
            });

            if (!service || service.length === 0 || service === null) {
                res.status(400).json({
                    sucess: false,
                    error: 'No se encontro el servicio asociado al cliente'
                });
            };

            
            const employee = await db.Employee.findByPk(client.clientAppointment.employee_id, {
                raw: true,
            });

            if (!employee || employee.length === 0 || employee === null) {
                res.status(400).json({
                    sucess: false,
                    error: 'No se encontro el profesional de belleza asociado al cliente'
                });
            };


            const clientDetail = {
                clientId : client.client_id,
                fullName: `${client.first_name} ${client.middle_name} ${client.last_name}`,
                phoneNumber: client.phone_number,
                email: client.email,
                appointment: {  
                    appointmentId: client.clientAppointment.appointment_id,
                    serviceName: service.service_name,
                    employeeName: employee.full_name,
                    durationMinutes: client.clientAppointment.duration_minutes,
                    notes: client.clientAppointment.notes,
                    isPaid: client.clientAppointment.is_paid === 0 ? false : true,
                    reminder: client.clientAppointment.reminder === 0 ? false : true
                },
                updateClient: `http://localhost:4000/client/update/${client.client_id}`,
                destroyClient: `http://localhost:4000/client/destroy/${client.client_id}`
            };
            

            res.status(200).json({
                clientDetail,
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'error interno del servidor'
            })
            console.error(error);
        }

    },

    postCreateClient: async (req, res) => {

        try {

            const result = validationResult(req);

            const resultErrorsMap = result.errors.map((error) => ({
                [error.path]: error.msg
            }));

            if (result.errors.length > 0) {
                return res.status(400).json(resultErrorsMap);
            };

            const newClient = {
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                email: req.body.email,
            };

            const clientCreate = await db.Client.create(newClient, {
                raw: true
            });

            if (!clientCreate || clientCreate.length === 0 || clientCreate === null) {
                res.status(400).json({
                    success: false,
                    createError: 'error al crear el cliente'
                })
            };

            res.status(201).json({
                success: true,
                message: 'Cliente creado exitosamente!',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                errorServer: 'error interno del servidor'
            });
        };
    },

    updateClient: async (req, res) => {

        try {

            const result = validationResult(req);

            const resultErrorsMap = result.errors.map((error) => ({
                [error.path]: error.msg
            }));

            if (result.errors.length > 0) {
                return res.status(400).json(resultErrorsMap);
            };

            const clientId = req.params.id;
            const client = await db.Client.findByPk(clientId, {
                raw: true
            });

            if (clientId === client.client_id) {
                return res.status(404).json({
                    success: false,
                    error: 'Error de id'
                });
            }

            if (!client || client.length === 0 || client === null) {
                return res.status(404).json({
                    success: false,
                    error: 'El cliente no se ah encontrado'
                });
            };

            const clientUpdate = {
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                email: req.body.email,
            };



            const [rowsUpdate, updateAppointment] = await db.Client.update(clientUpdate, {
                where: {
                    client_id: clientId
                }
            });


            res.status(200).json({
                success: true,
                message: 'el cliente se actualizo correctamente',
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'error interno del servidor'
            })
            console.error(error);
        }
    },

    destroyClient: async (req, res) => {
        try {

            const clientId = req.params.id;


            const client = await db.Client.findByPk(clientId, {
                raw: true
            });


            if (!client || client.length === 0 || client === null) {
                return res.status(404).json({
                    success: false,
                    error: 'No se encontro el cliente'
                });
            };


            const clientDestroy = await db.Client.destroy({
                where: {
                    client_id: clientId
                },
                raw: true
            });

            if (!clientDestroy || clientDestroy.length === 0 || clientDestroy === null) {
                return res.status(500).json({
                    sucess: false,
                    error: 'error interno, No se elimino el cliente'
                });
            };


            res.status(200).json({
                success: true,
                message: 'Cliente eliminado exitosamente',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'error interno del servidor'
            });
        };
    },

};

module.exports = clientController;