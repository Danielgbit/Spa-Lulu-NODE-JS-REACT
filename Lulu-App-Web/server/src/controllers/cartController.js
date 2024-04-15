const {
    raw
} = require('express');
const db = require('../database/models');
const {
    where, Op
} = require('sequelize');


const cartController = {

    getAllCart: async (req, res) => {

        try {
            const AllCart = await db.Cart.findAll({
                raw: true
            });

            if (!AllCart || AllCart.length === 0) {
                res.status(400).json({
                    error: 'No se encontro el carrito'
                })
            };

            const cartElementsMap = AllCart.map((cart) => ({
                cart_id: cart.cart_id,
                user_id: cart.user_id,
                created_at: cart.created_at,
                cartDetail: `http://localhost:4000/cartDetail/${cart.cart_id}`
            }));

            res.status(200).json({
                allCarts: cartElementsMap
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'Error interno del servidor'
            })
            console.error(error);
        };

    },

    getCartDetail: async (req, res) => {

        try {

            const userId = req.params.userId;

            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                }
            }, {
                include: 'cartItems',
                raw: true,
                nest: true
            });

            if (!cart) {
                res.status(400).json({
                    sucess: false,
                    error: 'No se encontro el carrito'
                });
            };

            const cartItems = await db.CartItems.findAll({
                where: {
                    cart_id: cart.cart_id
                },
                include: 'products',
                raw: true,
                nest: true
            })

            const cartDetail = {
                cartId: cart.cart_id,
                userId: cart.user_id,
                createdAt: cart.created_at,
                lengthItems: cartItems.length,
                cartItems: Object.values(cartItems).map((value) => ({
                    itemId: value.item_id,
                    cartId: value.cart_id,
                    productId: value.product_id,
                    productName: value.products.product_name,
                    quantity: value.quantity,
                    stock: value.stock,
                    price: value.price,
                    discount: value.discount,
                    image: `http://localhost:4000/product/image/${value.products.product_id}`,
                    destroyItem: `http://localhost:4000/destroyProductInCart/${value.item_id}`,
                    updateItem: `http://localhost:4000/updateItemCart/${value.item_id}`
                }))
            };

            res.status(200).json({
                cartDetail
            });

        } catch (error) {
            res.status(500).json({
                error: 'error interno del servidor'
            })
            console.error(error);
        }

    },

    postCreateCart: async (req, res) => {

        try {

            const userId = req.params.userId;

            const user = await db.User.findByPk(userId, {
                raw: true,
            });

            if (!user || user.length === 0) {
                res.status(400).json({
                    success: false,
                    error: 'error al crear el para el usuario que no existe'
                })
            };

            const newCart = {
                user_id: userId,
            };

            const cartCreate = await db.Cart.create(newCart);

            if (!cartCreate || cartCreate.length === 0) {
                res.status(400).json({
                    success: false,
                    createError: 'error al crear el carrito'
                })
            };

            res.status(201).json({
                success: true,
                message: '¡Carrito creado exitosamente!',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                errorServer: 'Error interno del servidor'
            });
        };
    },

    postCreateProductInCart: async (req, res) => {

        try {

            const userId = req.params.userId;

            const user = await db.User.findByPk(userId, {
                raw: true,
            });

            if (!user || user.length === 0) {
                res.status(400).json({
                    success: false,
                    error: 'el usuario no existe'
                });
            };

            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                },
                rew: true
            });


            if (!cart || cart.length === 0) {
                res.status(400).json({
                    success: false,
                    error: 'el usuario no tiene un carrito existente'
                });
            };

            const productId = req.body.productId;

            if (!productId || productId.length === 0) {
                res.status(400).json({
                    success: false,
                    error: 'no se suministro un id del producto'
                });
            };

            const productSelected = await db.Product.findByPk(productId, {
                raw: true,
            });

            const searchProductInItemsCart = await db.CartItems.findOne({
                where: {
                    product_id: req.body.productId
                },
                raw: true
            });

            if (!searchProductInItemsCart) {
                
                const newProductInCart = {
                    cart_id: cart.cart_id,
                    product_id: req.body.productId,
                    quantity: 1,
                    stock: 0 || (Number(req.body.stock) - 1),
                    price: productSelected.price,
                    discount: productSelected.discount
                };

                const createProductInCart = await db.CartItems.create(newProductInCart);

                if (!createProductInCart || createProductInCart.length === 0) {
                    res.status(400).json({
                        success: false,
                        createError: 'error al crear el producto en el carrito'
                    })
                };

                res.status(201).json({
                    success: true,
                    message: '¡Producto creado correctamente en el carrito!',
                });


            } else {

                const updateQuantityProduct = {
                    quantity: searchProductInItemsCart.quantity + 1
                };

                const [rowsUpdateProductInCart, updateProductInCart] = await db.CartItems.update(updateQuantityProduct, {
                    where: {
                        product_id: searchProductInItemsCart.product_id
                    }
                });

                res.status(200).json({
                    success: true,
                    message: '¡Producto actualizado correctamente en el carrito!',
                });
            }



        } catch (error) {
            res.status(500).json({
                errorServer: 'error interno del servidor'
            });
            console.error(error);
        };
    },

    updateProductInCart: async (req, res) => {

        try {

            const itemCartId = req.params.itemCartId;
            const userId = req.body.userId

            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                },
                raw: true
            });

            if (!cart || cart.length === 0 || cart === null) {
                res.status(404).json({
                    success: false,
                    error: 'El usuario no tiene un carrito'
                });
            };

            const itemCart = await db.CartItems.findOne({
                where: {
                    cart_id: cart.cart_id,
                    item_id: itemCartId
                },
                raw: true
            });

            if (!itemCart || itemCart.length === 0 || itemCart === null) {
                res.status(404).json({
                    success: false,
                    error: 'No exite el producto en el carrito'
                });
            };

            const action = req.body.action;
            const updateItemCart = {};

            if (action === 'increment') {
                updateItemCart.quantity = itemCart.quantity + 1;
                updateItemCart.stock = itemCart.stock - 1
            } else if (action === 'decrement') {
                updateItemCart.quantity = itemCart.quantity - 1;
                updateItemCart.stock = itemCart.stock + 1
            };

            const [rowsUpdate, updateCartItems] = await db.CartItems.update(updateItemCart, {
                where: {
                    item_id: itemCart.item_id
                }
            });

            if (rowsUpdate === 0) {
                res.status(500).json({
                    success: false,
                    error: 'error interno, no se puedo actualizar el producto en el carrito',
                });
            };

            res.status(200).json({
                success: true,
                message: 'se actualizo correctamente el producto en el carrito',
            });

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    },

    destroyCart: async (req, res) => {
        try {

            const cartId = req.params.cartId;


            const cart = await db.Cart.findByPk(cartId, {
                raw: true
            });


            if (!cart || cart.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'No se encontro el carrito'
                });
            };

            const cartItems = await db.CartItems.findOne({
                where: {
                    cart_id: cartId
                },
                raw: true
            });


            if (Object.values(cartItems).length > 0) {

                await db.CartItems.destroy({
                    where: {
                        cart_id: cartId
                    },
                });
            };

            const cartDestroy = await db.Cart.destroy({
                where: {
                    cart_id: cartId
                }
            });

            if (!cartDestroy || cartDestroy.length === 0) {
                return res.status(500).json({
                    sucess: false,
                    error: 'error interno, No se elimino el carrito'
                });
            };

            res.status(200).json({
                success: true,
                message: 'Carrito eliminado exitosamente',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'error interno del servidor'
            });
        };
    },

    destroyProductInCart: async (req, res) => {
        try {

            const itemId = Number(req.params.itemId);

            const CartItems = await db.CartItems.findByPk(itemId, {
                raw: true
            });

            if (!CartItems || CartItems.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'No se encontro el producto en el carrito'
                });
            };

            const cartItemDestroy = await db.CartItems.destroy({
                where: {
                    item_id: itemId
                },
                raw: true
            });

            if (!cartItemDestroy || cartItemDestroy.length === 0 || typeof cartItemDestroy === null) {
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

    emptyCart: async (req, res) => {
        try {

            const { userId } = req.body;

            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                },
                raw: true
            });

            if (!cart) {
                return res.status(400).json({ message: 'no se encontro el carrito' });
            }

            await db.CartItems.destroy({
                where: {
                    cart_id: cart.cart_id
                }
            });

            res.status(200).json({
                success: true,
                message: 'Carrito vaciado exitosamente',
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 'error interno del servidor'
            });
        };
    },
    
    

};

module.exports = cartController;