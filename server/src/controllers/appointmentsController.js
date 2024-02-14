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
                res.status(400).json({
                    error: 'No se encontro la cita'
                })
            };

            const appointmentElementsMap = allAppointment.map((appointment) => ({
                appointment_id: appointment.appointment_id,
                client: `${appointment.appointmentClient.first_name} ${appointment.appointmentClient.middle_name} ${appointment.appointmentClient.last_name}`,
                service: appointment.appointmentService.service_name,
                employee: appointment.appointmentEmployee.full_name,
                duration_minutes: appointment.duration_minutes,
                notes: appointment.notes,
                is_paid: appointment.is_paid === 0 ? false : true,
                status: appointment.status,
                reminder: appointment.reminder === 0 ? false : true,
                appointmentDetail: `http://localhost:4000/appointmentDetail/${appointment.appointment_id}`
            }));

            const allEmployees = await db.Employee.findAll({
                include: 'employeeAvailability',
                raw: true,
                nest: true
            });

            const employeeElementsMap = allEmployees.map((employee) => ({
                employeeId: employee.employee_id,
                fullName: employee.full_name,
                phoneNumber: employee.phone_number,
                email: employee.email,
                position: employee.position,
                biography: employee.biography,
                availability: {
                    month: employee.employeeAvailability.month,
                    day: employee.employeeAvailability.day,
                    startTime: employee.employeeAvailability.start_time,
                    endTime: employee.employeeAvailability.end_time,
                    hour: employee.employeeAvailability.hour
                }
            }));

                

            res.status(200).json({
                allEmployees: employeeElementsMap,
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
                res.status(400).json({
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
                appointment_id: appointment.appointment_id,
                client: `${appointment.appointmentClient.first_name} ${appointment.appointmentClient.middle_name} ${appointment.appointmentClient.last_name}`,
                service: appointment.appointmentService.service_name,
                employee: appointment.appointmentEmployee.full_name,
                notes: appointment.notes,
                is_paid: appointment.is_paid === 0 ? false : true,
                status: appointment.status,
                reminder: appointment.reminder === 0 ? false : true,
                infoAppointment: {
                    month: availability.month,
                    day: availability.day,
                    startTime: availability.start_time,
                    endTime: availability.end_time,
                    duration_minutes: appointment.duration_minutes,
                    hour: availability.hour,
                },
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
                return res.status(400).json(resultErrorsMap);
            };

            const newAppointment = {
                client_id: req.body.client_id,
                service_id: req.body.service_id,
                employee_id: req.body.employee_id,
                duration_minutes: null,
                notes: req.body.notes,
                status: req.body.status,
                reminder: req.body.reminder,
                is_paid: req.body.is_paid
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
                employee_id: req.body.employee_id,
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
                return res.status(400).json(resultErrorsMap);
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
                client_id: req.body.client_id,
                service_id: req.body.service_id,
                employee_id: req.body.employee_id,
                duration_minutes: null,
                notes: req.body.notes,
                status: req.body.status,
                reminder: req.body.reminder,
                is_paid: req.body.is_paid
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
                employee_id: req.body.employee_id,
                month: req.body.month,
                day: req.body.day,
                hour: hourString,
                start_time: hourString,
                end_time: endTimeHour,
            };


            const [rowsUpdateAvailability, updateAvailability] = await db.Availability.update(availabilityUpdate, {
                where: {
                    employee_id: req.body.employee_id
                }
            });

            if (rowsUpdateAvailability === 0 && rowsUpdate === 0) {
                return res.status(500).json({
                    success: false,
                    error: 'No se modifico ningun campo',
                });
            };


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

};

module.exports = appointmentsController;