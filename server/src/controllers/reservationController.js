const db = require('../database/models');

const servicesController = {

    getAllReservations: async (req, res) => {

        try {
            const allReservations = await db.Reservation.findAll({
                include: 'serviceAvailable',
                raw: true,
                nest: true
            });

            if (!allReservations || allReservations === null || allReservations.length === 0) {
                res.status(400).json({error: 'No se encontraron reservas'});
            };

            const allReservationMap = allReservations.map((reservation) => ({
                availability_id: reservation.availability_id ,
                service_id: reservation.service_id ,
                available_date: reservation.available_date,
                start_time:reservation.start_time ,
                end_time: reservation.end_time,
                is_available: reservation.is_available,
                created_at: reservation.created_at,
/*                 image: `http://localhost:4000/image/${reservation.service_id}`,
                serviceDetail: `http://localhost:4000/serviceDetail/${reservation.service_id}` */
            }))
    
            res.status(200).json({
                allReservationMap
            });
            
        } catch (error) {
            res.status(500).json({errorServer: 'error interno del servidor'});
            console.error(error);
        };

    },

    getReservationDetail: async (req, res) => {

        try {

            const id = req.params.id;

            const reservation = await db.Reservation.findByPk(id, {
                include: 'availabilityService',
                raw: true,
                nest: true
            });
    
            if (!reservation || reservation.length === 0 || reservation === null) {
                res.status(400).json({
                    sucess: false,
                    error: 'No se encontro la reserva'
                });
            };
    
            const reservationDetail = {
                availability_id: reservation.availability_id ,
                service_id: reservation.service_id ,
                available_date: reservation.available_date,
                start_time:reservation.start_time ,
                end_time: reservation.end_time,
                is_available: reservation.is_available,
                created_at: reservation.created_at,
/*                 updateService: `http://localhost:4000/updateService/${service.service_id}`,
                destroyService: `http://localhost:4000/destroyService/${service.service_id}` */
            };
    
            res.status(200).json({
                reservationDetail
            });
            
        } catch (error) {
            res.status(500).json({errorServer: 'Error interno del servidor'})
            console.error(error);
        }

    },

    postCreateReservation: async (req, res) => {

        try {


            const newReservation = {
                user_id: req.body.user_id,
                service_id: req.body.service_id,
                availability_id: req.body.availability_id,
                reservation_date: req.body.reservation_date,
                start_time: req.body.start_time,
                end_time: req.file.end_time,
                number_of_people: req.body.number_of_people,
                preferences: req.body.preferences
            };

            const reservationCreate = await db.Reservation.create(newReservation);

            if (!reservationCreate || reservationCreate.length === 0 || reservationCreate === null) {
                res.status(400).json({
                    success: false,
                    createError: 'error al crear la reserva'});
            };

            res.status(201).json({
                success: true,
                message: 'reserva creada exitosamente!',
            });

        } catch (error) {
            res.status(500).json({errorServer: 'error interno del servidor'});
            console.error(error);
        };
    },

    updateReservation: async (req, res) => {
        
        try {

            const serviceId = req.params.id;

            const service = await db.Service.findByPk(serviceId, { raw: true, });

            if (!service || service.length === 0) {
                res.status(404).json({
                    success: false, 
                    error: 'Id del producto no encontrado' 
                });
            };

            const serviceUpdate = {
                service_id: serviceId,
                service_name: req.body.service_name,
                description: req.body.description,
                duration_minutes: req.body.duration_minutes,
                price: req.body.price,
                category_id: req.body.category_id
            }

            const [rowsUpdate, updateProduct] = await db.Service.update(serviceUpdate, {
                where: {
                    service_id: serviceId
                }
            });

            if (rowsUpdate === 0) {
                res.status(500).json({
                    success: false, 
                    error: 'error interno, no se puedo actualizar el servicio',
                });
            };

            res.status(200).json({
                success: true, 
                message: 'se actualizo correctamente el servicio',
            });
            
        } catch (error) {
            res.status(500).json({errorServer: 'error interno del servidor'})
            console.error(error);
        }
    },

    destroyReservation: async (req, res) => {
        try {

            const serviceId = Number(req.params.id);

            const service = await db.Service.findByPk(serviceId, {
                raw: true
            });
            

            if (!service || service.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'No se encontro el servicio a eliminar'
                });
            };

            const serviceDestroy = await db.Service.destroy({
                where: {
                    service_id: serviceId
                }
            });

            if (!serviceDestroy || serviceDestroy.length === 0) {
                return res.status(500).json({
                    sucess: false,
                    error: 'error interno, No se elimino el servicio'
                });
            };

            res.status(200).json({
                success: true,
                message: 'Servicio eliminado exitosamente',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'error interno del servidor'
            });
        };
    },
};

module.exports = servicesController;