const db = require('../database/models');
const {
    validationResult
} = require('express-validator');


const appointmentsController = {

    getAllAppointments: async (req, res) => {

        try {
            const allAppointment = await db.Appointment.findAll({
                include: ['appointmentEmployee', 'appointmentService', 'appointmentClient'],
                raw: true,
                nest: true
            });

            if (!allAppointment || allAppointment.length === 0 || allAppointment === null) {
                return res.status(400).json({
                    error: 'No se encontro la cita'
                });
            };



            const appointmentElementsMap = allAppointment.map((appointment) => ({
                appointmentId: appointment.appointment_id,
                client: `${appointment.appointmentClient.first_name} ${appointment.appointmentClient.middle_name} ${appointment.appointmentClient.last_name}`,
                service: appointment.appointmentService.service_name,
                employee: appointment.appointmentEmployee.full_name,
                durationMinutes: appointment.duration_minutes,
                notes: appointment.notes,
                isPaid: appointment.is_paid === 0 ? false : true,
                status: appointment.status,
                reminder: appointment.reminder === 0 ? false : true,
                appointmentDetail: `http://localhost:4000/appointmentDetail/${appointment.appointment_id}`
            }));

            
            res.status(200).json({
                allAppointments: appointmentElementsMap
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'Error interno del servidor'
            })
            console.error(error);
        };

    },

    getAppointmentDetail: async (req, res) => {

        try {

            const appointmentId = req.params.id;

            const appointment = await db.Appointment.findByPk(appointmentId, {
                include: ['appointmentEmployee', 'appointmentService', 'appointmentClient'],
                raw: true,
                nest: true
            });

            if (!appointment || appointment.length === 0 || appointment === null) {
                return res.status(400).json({
                    sucess: false,
                    error: 'No se encontro la cita'
                });
            };

            const availability = await db.Availability.findOne({
                where: {
                    employee_id: appointment.appointmentEmployee.employee_id
                },
                include: 'availabilityEmployee',
                raw: true,
                nest: true
            });


            const appointmentDetail = {
                appointmentId: appointment.appointment_id,
                clientId: appointment.client_id,
                serviceId: appointment.service_id,
                employeeId: appointment.employee_id,
                client: `${appointment.appointmentClient.first_name} ${appointment.appointmentClient.middle_name} ${appointment.appointmentClient.last_name}`,
                service: appointment.appointmentService.service_name,
                employee: appointment.appointmentEmployee.full_name,
                notes: appointment.notes,
                isPaid: appointment.is_paid === 0 ? false : true,
                status: appointment.status,
                reminder: appointment.reminder === 0 ? false : true,
                infoAppointment: availability ? {
                    month: availability.month,
                    day: availability.day,
                    startTime: availability.start_time,
                    endTime: availability.end_time,
                    durationMinutes: appointment.duration_minutes,
                    hour: availability.hour,
                } : null,
                appointmentDestroy: `http://localhost:4000/destroyAppointment/${appointment.appointment_id}`,
                appointmentUpdate: `http://localhost:4000/appointmentUpdate/${appointment.appointment_id}`,

            };

            res.status(200).json({
                appointmentDetail,
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'error interno del servidor'
            })
            console.error(error);
        }

    },

    postCreateAppointment: async (req, res) => {

        try {

            const result = validationResult(req);

            const resultErrorsMap = result.errors.map((error) => ({
                [error.path]: error.msg
            }));

            if (result.errors.length > 0) {
                return res.status(400).json({ errors: resultErrorsMap });
            };

            const newAppointment = {
                client_id: req.body.clientId,
                service_id: req.body.serviceId,
                employee_id: req.body.employeeId,
                duration_minutes: null,
                notes: req.body.notes,
                status: req.body.status,
                reminder: req.body.reminder,
                is_paid: req.body.isPaid
            };

            const service = await db.Service.findByPk(newAppointment.service_id, {
                raw: true
            });
            if (!service || service === null) {
                res.status(400).json({
                    sucess: false,
                    message: 'No se encontro el servicio'
                });
            };
            newAppointment.duration_minutes = service.duration_minutes;


            const appointmentCreate = await db.Appointment.create(newAppointment, {
                raw: true
            });

            if (!appointmentCreate || appointmentCreate.length === 0 || appointmentCreate === null) {
                res.status(400).json({
                    success: false,
                    createError: 'error al crear la cita'
                })
            };


            //Configure Hour increment minutes
            let currentTime = new Date();
            const hourString = req.body.hour;
            const [hours, minutes, seconds] = hourString.split(':');
            currentTime.setHours(hours, minutes, seconds);
            currentTime.setMinutes(currentTime.getMinutes() + service.duration_minutes);
            const endTimeHour = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;


            const availability = {
                employee_id: req.body.employeeId,
                month: req.body.month,
                day: req.body.day,
                hour: req.body.hour,
                start_time: req.body.hour,
                end_time: endTimeHour,
            };


            const createAvailability = await db.Availability.create(availability, {
                raw: true
            });

            if (!createAvailability || createAvailability.length === 0 || createAvailability === null) {
                res.status(400).json({
                    success: false,
                    createError: 'error al crear la cita'
                })
            };

            console.log('createAvailability', createAvailability);

            res.status(201).json({
                success: true,
                message: 'Cita creado exitosamente!',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                errorServer: 'error interno del servidor'
            });
        };
    },

    updateAppointment: async (req, res) => {

        try {

            const result = validationResult(req);

            const resultErrorsMap = result.errors.map((error) => ({
                [error.path]: error.msg
            }));

            if (result.errors.length > 0) {
                return res.status(400).json({ errors: resultErrorsMap});
            };

            const appointmentId = req.params.id;
            const appointment = await db.Appointment.findByPk(appointmentId, {
                raw: true
            });

            if (!appointment || appointment.length === 0 || appointment === null) {
                return res.status(404).json({
                    success: false,
                    error: 'La cita no se ah encontrado'
                });
            };

            const appointmentUpdate = {
                client_id: req.body.clientId,
                service_id: req.body.serviceId,
                employee_id: req.body.employeeId,
                duration_minutes: null,
                notes: req.body.notes,
                status: req.body.status,
                reminder: req.body.reminder,
                is_paid: req.body.isPaid
            };

            const service = await db.Service.findByPk(appointmentUpdate.service_id, {
                raw: true
            });

            if (!service || service === null) {
                return res.status(400).json({
                    sucess: false,
                    message: 'No se encontro el servicio'
                });
            };
            appointmentUpdate.duration_minutes = service.duration_minutes;


            const [rowsUpdate, updateAppointment] = await db.Appointment.update(appointmentUpdate, {
                where: {
                    appointment_id: appointmentId
                }
            });

            //Configure Hour increment minutes
            let currentTime = new Date();
            const hourString = req.body.hour;
            const [hours, minutes, seconds] = hourString.split(':');
            currentTime.setHours(hours, minutes, seconds);
            currentTime.setMinutes(currentTime.getMinutes() + service.duration_minutes);
            const endTimeHour = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;


            const availabilityUpdate = {
                employee_id: req.body.employeeId,
                month: req.body.month,
                day: req.body.day,
                hour: hourString,
                start_time: hourString,
                end_time: endTimeHour,
            };


            const [rowsUpdateAvailability, updateAvailability] = await db.Availability.update(availabilityUpdate, {
                where: {
                    employee_id: req.body.employeeId
                }
            });


            res.status(200).json({
                success: true,
                message: 'se actualizo correctamente la cita',
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'error interno del servidor'
            })
            console.error(error);
        }
    },

    destroyAppointment: async (req, res) => {
        try {

            const appointmentId = req.params.id;


            const appointment = await db.Appointment.findByPk(appointmentId, {
                raw: true
            });


            if (!appointment || appointment.length === 0 || appointment === null) {
                return res.status(404).json({
                    success: false,
                    error: 'No se encontro la cita'
                });
            };

            const availability = await db.Appointment.findOne({
                where: {
                    employee_id: appointment.employee_id
                },
                raw: true
            });

            if (!availability || availability.length === 0 || availability === null) {
                return res.status(404).json({
                    success: false,
                    error: 'No se encontro la disponibilidad asociada'
                });
            };


            const appointmentDestroy = await db.Appointment.destroy({
                where: {
                    appointment_id: appointmentId
                },
                raw: true
            });

            if (!appointmentDestroy || appointmentDestroy.length === 0 || appointmentDestroy === null) {
                return res.status(500).json({
                    sucess: false,
                    error: 'error interno, No se elimino la cita'
                });
            };

            const availabilityDestroy = await db.Availability.destroy({
                where: {
                    employee_id: availability.employee_id
                },
                raw: true
            });

            if (!availabilityDestroy || availabilityDestroy.length === 0 || availabilityDestroy === null) {
                return res.status(500).json({
                    sucess: false,
                    error: 'error interno, No se elimino la disponibilidad asociada'
                });
            };


            res.status(200).json({
                success: true,
                message: 'Cita eliminada exitosamente',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'error interno del servidor'
            });
        };
    },



    getAllEmployees: async (req, res) => {

        try {
            const allEmployees = await db.Employee.findAll({
                raw: true,
                nest: true
            });

            if (!allEmployees) {
                res.status(400).json({ error: 'No hay empleados registrados', success: false });
            };

            const employeeElementsMap = allEmployees.map((employee) => ({
                employeeId: employee.employee_id,
                fullName: employee.full_name,
                phoneNumber: employee.phone_number,
                email: employee.email,
                position: employee.position,
                biography: employee.biography,
            }));

                

            res.status(200).json({ allEmployees: employeeElementsMap });

        } catch (error) {
            res.status(500).json({
                errorServer: 'Error interno del servidor'
            })
            console.error(error);
        };

    },

    getAvailabilityEmployee: async (req, res) => {

        try {
            const id = req.params.id;


            const employeeData = await db.Employee.findAll({
                where: {
                    employee_id: id
                },
                include: [
                    {
                        model: db.Availability,
                        as: 'employeeAvailability'
                    },
                    {
                        model: db.Appointment,
                        as: 'employeeAppointment'
                    }
                ],
                nest: true
            });


            res.status(200).json({
                combinedEmployeeData
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'Error interno del servidor'
            })
            console.error(error);
        };

    },

};

module.exports = appointmentsController;