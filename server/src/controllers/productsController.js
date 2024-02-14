const db = require('../database/models');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');


const productsController = {

    getAllProducts: async (req, res) => {

        try {
            const allProducts = await db.Product.findAll({
                raw: true
            });

            if (!allProducts) {
                res.status(400).json({error: 'No se encontro el producto'})
            };

            const categoryProducts = await db.ProductCategory.findAll({
                include: 'categoryProducts',
                raw: true
            });


            const allProductsLimit = await db.Product.findAll({
                raw: true,
                limit: 4
            });

            if (!allProductsLimit) {
                res.status(400).json({error: 'No se encontro el producto'})
            };

            const allCategories = await db.ProductCategory.findAll({
                raw: true
            });

            if (!allCategories) {
                res.status(400).json({error: 'No se encontraron las categorias'})
            };

            const allProductsMap = allProducts.map((product) => ({
                productId: product.product_id ,
                productName: product.product_name ,
                description: product.description,
                price: product.price ,
                categoryId: product.category_id ,
                image: `http://localhost:4000/product/image/${product.product_id}`,
                productDetail: `http://localhost:4000/productDetail/${product.product_id}`
            }))
    
            res.status(200).json({
                allProductsLimit: allProductsLimit,
                allProducts: allProductsMap,
                allCategories: allCategories,
                categoryProducts
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({errorServer: 'Error interno del servidor'})
        };

    },

    getCategoryProducts: async (req, res) => {

        try {

            const categoryId = req.params.id
            
            const categoryProducts = await db.ProductCategory.findAll({
                where:{
                    category_id: categoryId
                },
                include: 'categoryProducts',
                raw: true,
                nest: true
            });

            if (!categoryProducts || categoryProducts === null) {
                res.status(404).json({ sucess: false, error: 'product category not found' });
            };

            const categoryName = await db.ProductCategory.findByPk(categoryId,{
                raw: true,
                nest: true
            });


            const categoryProductsMap = categoryProducts.map((category) => ({
                categoryId: category.category_id,
                productId: category.categoryProducts.product_id,
                productName: category.categoryProducts.product_name,
                description: category.categoryProducts.description,
                price: category.categoryProducts.price,
                image: `http://localhost:4000/category/image/${category.categoryProducts.product_id}`,
                productDetail: `http://localhost:4000/productDetail/${category.categoryProducts.product_id}`
            }));
    
            res.status(200).json({
                length: categoryProductsMap.length,
                categoryName: categoryName.category_name,
                categoryId: categoryName.category_id,
                categoryProducts: categoryProductsMap
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({errorServer: 'Error interno del servidor'})
        };

    },

    getSearchProducts: async (req, res) => {

        try {

            const search = req.query.name;

            if (!search) {
                return res.status(400).json({
                    error: 'Debe proporcionar un término de búsqueda'
                });
            }

            const results = await db.Product.findAll({
                where: {
                    product_name: {
                        [Op.like]: `%${search}%`
                    }
                },
                raw: true
            });


            const searchResultProducts = results.map((result) => ({
                categoryId: result.category_id,
                productId: result.product_id,
                productName: result.product_name,
                description: result.description,
                price: result.price,
                image: `http://localhost:4000/product/image/${result.product_id}`,
                productDetail: `http://localhost:4000/product/detail/${result.product_id}`
            }));
    
            res.status(200).json({
                searchResultProducts
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({errorServer: 'Error interno del servidor'})
        };

    },

    getProductDetail: async (req, res) => {

        try {

            const id = req.params.id;

            const product = await db.Product.findByPk(id, {
                include: 'productsCategory',
                raw: true,
                nest: true
            });
    
            if (!product) {
                res.status(400).json({error: 'No se encontro el producto'})
            };
    
            const productDetail = {
                productId: product.product_id,
                name: product.product_name,
                description: product.description,
                price: product.price,
                categoryId: product.productsCategory.category_id,
                category_name: product.productsCategory.category_name,
                image: `http://localhost:4000/product/image/${product.product_id}`,
                updateProduct: `http://localhost:4000/updateProduct/${product.product_id}`,
                destroyProduct: `http://localhost:4000//destroyProduct/${product.product_id}`
            };
    
            res.status(200).json({
                productDetail
            });
            
        } catch (error) {
            res.status(500).json({errorServer: 'Error interno del servidor'})
            console.error(error);
        }

    },

    getProductImage: async (req, res) => {

        try {

            const productId = req.params.productId;

            const product = await db.Product.findByPk(productId, {
                raw: true,
            });
    
            if (!product || product.length === 0  || product.image === null) {
                res.status(400).json({
                    sucess: false,
                    error: 'El producto no contiene una imagen'
                });
            };

            const imagePath = path.join(__dirname, '..', '..', '/public/imgs/products', product.image);


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

    postCreateProduct: async (req, res) => {

        try {

            const result = validationResult(req);
            
            const resultErrorsMap = result.errors.map((error) => ({
                    [error.path]: error.msg
                })
            );

            if (result.errors.length > 0) {
                return res.status(400).json(resultErrorsMap);
            };


            const newProduct = {
                product_name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category_id: req.body.category_id,
                image: req.file.filename
            };


            const productCreate = await db.Product.create(newProduct);

            if (!productCreate) {
                res.status(400).json({
                    success: false,
                    createError: 'error al crear el producto'})
            };

            res.status(201).json({
                success: true,
                message: '¡Producto creado exitosamente!',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({errorServer: 'Error interno del servidor'});
        };
    },

    updateProduct: async (req, res) => {
        try {

            const result = validationResult(req);
            
            if (result.errors.length > 0) {
                if (req.file) {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'products', req.file.filename);
                    fs.unlinkSync(pathImage) 
                    const resultErrorsMap = result.errors.map((error) => ({ [error.path]: error.msg })); 
                    return res.status(400).json(resultErrorsMap);
                }else{
                    const resultErrorsMap = result.errors.map((error) => ({ [error.path]: error.msg })); 
                    return res.status(400).json(resultErrorsMap);
                };
            };


            const productId = req.params.id;

            const product = await db.Product.findByPk(productId, { raw: true, });

            if (!product || product.length === 0) {
                if (req.file) {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'products', req.file.filename);
                    fs.unlinkSync(pathImage);
                    res.status(404).json({ success: false, error: 'Id del producto no encontrado' });
                }else{
                    res.status(404).json({ success: false, error: 'Id del producto no encontrado' });
                }

            };

            if (req.file) {
                const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'products', product.image);
                fs.unlinkSync(pathImage);
            };

            const productUpdate = {
                product_id: productId,
                product_name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category_id: req.body.category_id,
                image: req.file ? req.file.filename : product.image
            }

            const [rowsUpdate, updateProduct] = await db.Product.update(productUpdate, {
                where: {
                    product_id: productId
                }
            });
        
            
            res.status(200).json({
                success: true, 
                message: 'se actualizó correctamente el producto',
            });
            
            
        } catch (error) {
            res.status(500).json({errorServer: 'error interno del servidor'})
            console.error(error);
        }
    },

    destroyProduct: async (req, res) => {
        try {

            const productId = Number(req.params.id);

            const product = await db.Product.findByPk(productId, {
                raw: true
            });
            

            if (!product || product.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'No se encontro el producto a eliminar'
                });
            };

            const productDestroy = await db.Product.destroy({
                where: {
                    product_id: productId
                }
            });

            if (!productDestroy || productDestroy.length === 0) {
                return res.status(500).json({
                    sucess: false,
                    error: 'error interno, No se elimino el producto'
                });
            };

            res.status(200).json({
                success: true,
                message: 'Producto eliminado exitosamente',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'error interno del servidor'
            });
        };
    },

};

module.exports = productsController;