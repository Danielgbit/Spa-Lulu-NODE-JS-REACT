const db = require('../database/models');
const path = require('path');
const fs = require('fs');
const {validationResult } = require('express-validator');


const servicesController = {

    getAllServices: async (req, res) => {

        try {
            const allServices = await db.Service.findAll({
                include: 'serviceCategory',
                nest: true,
                raw: true
            });

            if (!allServices) {
                res.status(400).json({error: 'No se encontraron servicios'})
            };

            const allServicesLimit = await db.Service.findAll({
                include: 'serviceCategory',
                raw: true,
                nest: true,
                limit: 4
            });

            if (!allServicesLimit) {
                res.status(400).json({error: 'No se encontraron servicios'})
            };


            const allServicesLimitMap = allServicesLimit.map((service) => ({
                serviceId: service.service_id ,
                serviceName: service.service_name ,
                description: service.description,
                durationMinutes:service.duration_minutes  ,
                price: service.price ,
                createdAt: service.created_at ,
                categoryId: service.category_id ,
                categoryName: service.serviceCategory.category_name,
                image: `http://localhost:4000/service/image/${service.service_id}`,
                serviceDetail: `http://localhost:4000/service/detail/${service.service_id}`
            }))


            const allServicesMap = allServices.map((service) => ({
                serviceId: service.service_id ,
                serviceName: service.service_name ,
                description: service.description,
                durationMinutes:service.duration_minutes  ,
                price: service.price ,
                createdAt: service.created_at ,
                categoryId: service.category_id ,
                categoryName: service.serviceCategory.category_name,
                image: `http://localhost:4000/service/image/${service.service_id}`,
                serviceDetail: `http://localhost:4000/service/detail/${service.service_id}`
            }))

    
            res.status(200).json({
                allServicesLimit: allServicesLimitMap,
                allServices: allServicesMap,
            });
            
        } catch (error) {
            res.status(500).json({errorServer: 'error interno del servidor'})
            console.error(error);
        };

    },

    getAllCategories: async (req, res) => {

        try {
            const allCategories = await db.ServiceCategory.findAll({
                raw: true
            });

            if (!allCategories) {
                res.status(400).json({error: 'No se encontraron las categorias'})
            };

            const allCategoriesMap = allCategories.map((category) => ({
                categoryId: category.category_id,
                categoryName: category.category_name
            }));
    
            res.status(200).json({
                allCategories: allCategoriesMap
            });
            
        } catch (error) {
            res.status(500).json({errorServer: 'error interno del servidor'})
            console.error(error);
        };

    },

    getCategoryServices: async (req, res) => {

        try {

            const categoryId = req.params.id
            
            const categoryServices = await db.ServiceCategory.findAll({
                where:{
                    category_id: categoryId
                },
                include: 'categoryServices',
                raw: true,
                nest: true
            });

            if (!categoryServices || categoryServices === null) {
                res.status(404).json({ sucess: false, error: 'service category not found' });
            };

            const categoryName = await db.ServiceCategory.findByPk(categoryId,{
                raw: true,
                nest: true
            });


            const categoryServiceMap = categoryServices.map((category) => ({
                categoryId: category.category_id,
                serviceId: category.categoryServices.service_id,
                serviceName: category.categoryServices.service_name,
                description: category.categoryServices.description,
                durationMinutes: category.categoryServices.duration_minutes,
                price: category.categoryServices.price,
                image: `http://localhost:4000/service/image/${category.categoryServices.service_id}`,
                serviceDetail: `http://localhost:4000/service/detail/${category.categoryServices.service_id}`
            }));
    
            res.status(200).json({
                length: categoryServiceMap.length,
                categoryName: categoryName.category_name,
                categoryId: categoryName.category_id,
                categoryServices: categoryServiceMap
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({errorServer: 'Error interno del servidor'})
        };

    },

    getServiceDetail: async (req, res) => {

        try {

            const id = req.params.id;

            const service = await db.Service.findByPk(id, {
                include: 'serviceCategory',
                raw: true,
                nest: true
            });

            if (!service || service.length === 0) {
                return res.status(404).json({ error: 'Servicio no encontrado' });
            };

            const serviceDetail = {
                serviceId: service.service_id,
                serviceName: service.service_name,
                description: service.description,
                durationMinutes: service.duration_minutes,
                price: service.price,
                created_at: service.created_at,
                categoryId: service.serviceCategory.category_id,
                categoryName: service.serviceCategory.category_name,
                image: `http://localhost:4000/service/image/${service.service_id}`,
                updateService: `http://localhost:4000/updateService/${service.service_id}`,
                destroyService: `http://localhost:4000/destroyService/${service.service_id}`

            };
    
            res.status(200).json({
                serviceDetail
            });
            
        } catch (error) {
            res.status(500).json({errorServer: 'Error interno del servidor'})
            console.error(error);
        }

    },

    getServiceImage: async (req, res) => {

        try {

            const serviceId = req.params.serviceId;

            const service = await db.Service.findByPk(serviceId, {
                raw: true,
            });
    
            if (!service || service.length === 0  || service.image === null) {
                res.status(400).json({
                    sucess: false,
                    error: 'El servicio no contiene una imagen'
                });
            };

            const imagePath = path.join(__dirname, '..', '..', '/public/imgs/services', service.image);


            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(404).json({ error: 'La imagen no existe' });
                };

                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(data, 'binary');
                
            });
            
        } catch (error) {
            res.status(500).json({errorServer: 'error interno del servidor'})
            console.error(error);
        }

    },

    postCreateService: async (req, res) => {
        
        try {
            const result = validationResult(req);

            const resultErrorsMap = result.errors.map((error) => ({ [error.path]: error.msg }));

            if (result.errors.length > 0 ) {
                if (req.file) {
                    fs.unlinkSync(path.join(__dirname, '../../public/imgs/services', req.imageFileName));
                    return res.status(400).json({ errors: resultErrorsMap});
                }else {
                    return res.status(400).json({ errors: resultErrorsMap});
                }
            };

            const newService = {
                service_name: req.body.serviceName,
                description: req.body.description,
                duration_minutes: req.body.durationMinutes,
                price: req.body.price,
                category_id: req.body.categoryId,
                image: req.file ? req.imageFileName : null
            };

            const serviceCreate = await db.Service.create(newService);

            if (!serviceCreate || serviceCreate.length === 0 ) {
                if(req.file) { fs.unlinkSync(path.join(__dirname, '../../public/imgs/services', req.imageFileName)); }
                return res.status(400).json({ success: false, createError: 'error al crear el servicio'});
            };

            res.status(201).json({
                success: true,
                message: 'Servicio creado exitosamente!',
            });

        } catch (error) {
            console.error(error);
            if (req.file) { fs.unlinkSync(path.join(__dirname, '../../public/imgs/services', req.imageFileName)) }
            res.status(500).json({errorServer: 'error interno del servidor'});
        };
    },

    updateService: async (req, res) => {
        
        try {

            const result = validationResult(req);
            
            if (result.errors.length > 0) {
                if (req.file) {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'services', req.imageFileName);
                    fs.unlinkSync(pathImage) 
                    const resultErrorsMap = result.errors.map((error) => ({ [error.path]: error.msg })); 
                    return res.status(400).json({ errors: resultErrorsMap});
                }else{
                    const resultErrorsMap = result.errors.map((error) => ({ [error.path]: error.msg })); 
                    return res.status(400).json({ errors: resultErrorsMap});
                };
            };

            const serviceId = req.params.id;

            const service = await db.Service.findByPk(serviceId, { raw: true, });

            if (!service || service.length === 0) {
                if (req.file) {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'services', req.imageFileName);
                    fs.unlinkSync(pathImage);
                    res.status(404).json({ success: false, error: 'Id del producto no encontrado' });
                }else{
                    res.status(404).json({ success: false,  error: 'Id del producto no encontrado' });
                }
            };

            if (req.file) {
                const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'services', service.image);
                fs.unlinkSync(pathImage);
            };

            const serviceUpdate = {
                service_id: serviceId,
                service_name: req.body.serviceName,
                description: req.body.description,
                duration_minutes: req.body.durationMinutes,
                price: req.body.price,
                category_id: req.body.categoryId,
                image: req.file ? req.imageFileName : service.image
            }

            const [rowsUpdate, updateProduct] = await db.Service.update(serviceUpdate, {
                where: {
                    service_id: serviceId
                }
            });

            if (rowsUpdate === 0) {
                return res.status(304).json({ message: 'Not modified' });
            };

            res.status(200).json({
                success: true, 
                message: 'se actualizo correctamente el servicio',
            });
            
        } catch (error) {
            console.error(error);
            fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'imgs', 'services', req.imageFileName));
            res.status(500).json({errorServer: 'error interno del servidor'})
        }
    },

    destroyService: async (req, res) => {
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