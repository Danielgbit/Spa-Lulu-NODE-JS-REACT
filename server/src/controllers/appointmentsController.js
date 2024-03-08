const db = require('../database/models');
const {
    validationResult
} = require('express-validator');


const appointmentsController = {

    getAllAppointments: async (req, res) => {

        try {
            const appointmentAndAvailability = await db.AppointmentAvailability.findAll({
                include: [
                    {
                        model: db.Appointment,
                        as: 'appointment',
                        include: [
                            {
                                model: db.Service,
                                as: 'appointmentService',
                                atributes: ['service_name']
                            },
                            {
                                model: db.Client,
                                as: 'appointmentClient',
                                atributes: ['first_name', 'middle_name', 'last_name']
                            }
                        ],
                    },
                    {
                        model: db.Availability,
                        as: 'availability',
                        include: [
                            {
                                model: db.Employee,
                                as: 'availabilityEmployee',
                                atributes: ['full_name']
                            }
                        ],
                    },
                    ],
                    nest: true,
                    raw: true
            });

            console.log(appointmentAndAvailability);

            const combinedData = appointmentAndAvailability?.map((data) => ({
                employeeName: data.availability.availabilityEmployee.full_name,
                appointmentId: data.appointment_id,
                clientName: `${data.appointment.appointmentClient.first_name} ${data.appointment.appointmentClient.middle_name} ${data.appointment.appointmentClient.last_name}`,
                serviceName: data.appointment.appointmentService.service_name,
                duration: data.appointment.duration,
                notes: data.appointment.notes,
                duration: data.appointment.duration_minutes,
                status: data.appointment.status,
                reminder: data.appointment.reminder,
                isPaid: data.appointment.is_paid,
                startTime: data.availability.start_time,
                endTime: data.availability.end_time,
            }));
            

            res.status(200).json({
                allAppointments: combinedData
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
            const id = req.params.id;

            const appointmentAndAvailability = await db.AppointmentAvailability.findAll({
                where: { employee_id: id},
                include: [
                    {
                        model: db.Availability,
                        as: 'availability',
                        include: [
                            {
                                model: db.Employee,
                                as: 'availabilityEmployee',
                            },
                            {
                                model: db.Appointment,
                                as: 'availabilityAppointments',
                                include: [
                                    {
                                        model: db.Service,
                                        as: 'appointmentService',
                                        attributes: ['service_name']
                                    }
                                ]
                            }
                        ],
                    },
                ],
            });

            const citasEmpleadoFormateadas = appointmentAndAvailability.map((cita) => ({
                id: cita.id,
                appointmentId: cita.appointment_id,
                availabilityId: cita.availability_id,
                employeeId: cita.employee_id,
                availability: {
                  availabilityId: cita.availability.availability_id,
                  employeeId: cita.availability.employee_id,
                  startTime: cita.availability.start_time,
                  endTime: cita.availability.end_time,
                  availabilityAppointments: cita.availability.availabilityAppointments.map((appointment) => ({
                    appointmentId: appointment.appointment_id,
                    clientId: appointment.client_id,
                    serviceId: appointment.service_id,
                    employeeId: appointment.employee_id,
                    duration_minutes: appointment.duration_minutes,
                    notes: appointment.notes,
                    status: appointment.status,
                    reminder: appointment.reminder,
                    isPaid: appointment.is_paid,
                    serviceName: appointment.appointmentService.service_name
                  })),
                },
              }));
          
              // Filtra solo las disponibilidades
              const disponibilidadesEmpleado = citasEmpleadoFormateadas.map((cita) => cita.availability);
          
              res.json({
                availabilities: disponibilidadesEmpleado,
              });

        } catch (error) {
            res.status(500).json({
                errorServer: 'Error interno del servidor'
            })
            console.error(error);
        };

    },

    getAppointmentUpdate: async (req, res) => {

        try {
            const id = req.params.id;
            
            const appointmentAndAvailability = await db.AppointmentAvailability.findAll({
                where: { appointment_id: id},
                include: [
                    {
                        model: db.Availability,
                        as: 'availability',
                        include: [
                            {
                                model: db.Employee,
                                as: 'availabilityEmployee',
                            },
                            {
                                model: db.Appointment,
                                as: 'availabilityAppointments',
                                include: [
                                    {
                                        model: db.Service,
                                        as: 'appointmentService',
                                        attributes: ['service_name']
                                    }
                                ]
                            }
                        ],
                    },
                ],
            });

            const citasEmpleadoFormateadas = {
                id: appointmentAndAvailability[0]?.id,
                appointmentId: appointmentAndAvailability[0]?.appointment_id,
                availabilityId: appointmentAndAvailability[0]?.availability_id,
                employeeId: appointmentAndAvailability[0]?.employee_id,
                availabilityAppointments: {
                  availabilityId: appointmentAndAvailability[0]?.availability.availability_id,
                  employeeId: appointmentAndAvailability[0]?.availability.employee_id,
                  startTime: appointmentAndAvailability[0]?.availability.start_time,
                  endTime: appointmentAndAvailability[0]?.availability.end_time,
                    appointmentId: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].appointment_id,
                    clientId: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].client_id,
                    serviceId: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].service_id,
                    employeeId: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].employee_id,
                    duration_minutes: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].duration_minutes,
                    notes: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].notes,
                    status: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].status,
                    reminder: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].reminder,
                    isPaid: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].is_paid,
                    serviceName: appointmentAndAvailability[0]?.availability.availabilityAppointments[0].appointmentService.service_name
                },
              }
          
              res.json({
                appointmentDetail: citasEmpleadoFormateadas,
              });

        } catch (error) {
            res.status(500).json({
                errorServer: 'Error interno del servidor'
            })
            console.error(error);
        };

    },

    postCreateAppointment: async (req, res) => {

        try {

            const result = validationResult(req);

            const resultErrorsMap = result.errors.map((error) => ({
                [error.path]: error.msg
            }));

            if (result.errors.length > 0) {
                return res.status(400).json({
                    errors: resultErrorsMap
                });
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
                raw: true, nest: true
            });


            if (!appointmentCreate || appointmentCreate.length === 0 || appointmentCreate === null) {
                res.status(400).json({
                    success: false,
                    createError: 'error al crear la cita'
                })
            };

            const availability = {
                employee_id: req.body.employeeId,
                start_time: req.body.startTime,
                end_time: req.body.endTime,
            };


            const createAvailability = await db.Availability.create(availability, {
                raw: true, nest: true
            });


            if (!createAvailability || createAvailability.length === 0 || createAvailability === null) {
                res.status(400).json({
                    success: false,
                    createError: 'error al crear la cita'
                })
            };


            db.AppointmentAvailability.create({
                appointment_id: appointmentCreate.appointment_id,
                availability_id: createAvailability.availability_id,
                employee_id: createAvailability.employee_id

            }, {raw: true});


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
                return res.status(400).json({
                    errors: resultErrorsMap
                });
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

            const { employeeId, startTime, endTime } = req.body;

            const availabilityUpdate = {
                employee_id: employeeId ,
                start_time: startTime,
                end_time: endTime,
            };


            const [rowsUpdateAvailability, updateAvailability] = await db.Availability.update(availabilityUpdate, {
                where: {
                    employee_id: employeeId
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
            raw: true,
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                error: "No se encontró la cita",
            });
        }

        const appointmentAvailabilityToDelete = await db.AppointmentAvailability.findOne({
            where: {
                appointment_id: appointmentId,
            },
            raw: true,
        });

        await db.AppointmentAvailability.destroy({
            where: {
                appointment_id: appointmentId,
            },
            nest: true,
            raw: true
        });


        const availabilityDestroy = await db.Availability.destroy({
            where: {
                availability_id: appointmentAvailabilityToDelete.availability_id,
            },
            raw: true,
        });

        if (!availabilityDestroy) {
            return res.status(500).json({
                success: false,
                error: "Error interno, no se eliminó la disponibilidad asociada",
            });
        }

        const appointmentDestroy = await db.Appointment.destroy({
            where: {
                appointment_id: appointmentId,
            },
            raw: true,
        });

        if (!appointmentDestroy) {
            return res.status(500).json({
                success: false,
                error: "Error interno, no se eliminó la cita",
            });
        }

        res.status(200).json({
            success: true,
            message: "Cita eliminada exitosamente",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
},
};

module.exports = appointmentsController;