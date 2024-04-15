const db = require('../database/models');

const orderController = {

    getOrders: async (req, res) => {
        try {
            const orders = await db.Order.findAll({
                 raw: true,
                 nest: true
            });

            if (!orders) { return res.status(404).json({ message: 'not found orders' }) }

            const ordersMapped = orders.map((order) => ({
                orderId: order.order_id,
                orderDate: order.order_date,
                total: order.order_amount,
                status: order.status,
                paymentMethod: order.payment_method,
                paymentEmail: order.payment_email,
                phoneNumber: order.phone_number
            }));

            res.status(200).json({ orders: ordersMapped });
            
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: e.message });
        }
    },
    
    getOrder: async (req, res) => {
        try {
            const { id } = req.params;

            const orderDetail = await db.Order.findOne({
                where: {
                    order_id: id
                },
                include: [
                    {
                        model: db.User, 
                        as: 'OrderUser',
                        attributes: [
                            'first_name', 
                            'middle_name', 
                            'last_name',
                            'phone_number',
                            'email',
                            'city',
                            'district',
                            'address',
                        ]
                    },
                    {
                        model: db.OrderDetail,
                        as: 'OrderDetails',
                        attributes: [
                            'product_id', 
                            'quantity', 
                            'price',
                        ],
                        include: [
                            {
                                model: db.Product,
                                as: 'OrderProduct',
                                attributes: ['product_name', 'price']
                            }
                        ]
                    }
                ]
            });

            if (!orderDetail) { return res.status(200).json({ message: 'not found orders' }) }

            const ordersMapped = ([{
                orderId: orderDetail.order_id,
                firstName: orderDetail.OrderUser.first_name,
                middleName: orderDetail.OrderUser.middle_name,
                lastName: orderDetail.OrderUser.last_name,
                phoneNumber: orderDetail.OrderUser.phone_number,
                email: orderDetail.OrderUser.email,
                city: orderDetail.OrderUser.city,
                district: orderDetail.OrderUser.district,
                address: orderDetail.OrderUser.address,
            }]);

            res.status(200).json({ orderDetail: ordersMapped });
            
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: e.message });
        }
    },

    getOrderProducts: async (req, res) => {
        try {
            const { id } = req.params;

            const orderDetail = await db.OrderDetail.findAll({
                where: {
                    order_id: id
                },
                include: [
                    {
                        model: db.Product,
                        as: 'OrderProduct',
                        attributes: ['product_name', 'stock', 'discount']
                    }
                ],
                nest: true,
                raw: true
            })

            if (!orderDetail) { return res.status(200).json({ message: 'not found orders' }) }

            const orderProductsMapped = orderDetail.map((order) => ({
                productName: order.OrderProduct.product_name,
                quantity: order.quantity,
                price: order.price,
                stock: order.OrderProduct.stock,
                discount: order.OrderProduct.discount,
            }));

            res.status(200).json({ orderProducts: orderProductsMapped });
            
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: e.message });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;

            if (id.toString().length === 0) {
                return res.status(404).json({ message: 'not found id' });
            };

            const order = await db.Order.destroy({
                where: {
                    order_id: id
                }
            });

            if(!order) { return res.status(400).json({ message: 'failed destroy' }) }

            await db.OrderDetail.destroy({
                where: {
                    order_id: id
                }
            })

            await db.TrasactionDetail.destroy({
                where: {
                    order_id: id
                }
            })

            res.status(200).json({ message: 'destroy successfull' });
            
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: e.message });
        }
    }
};

module.exports = orderController;