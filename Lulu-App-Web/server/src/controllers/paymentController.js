const mercadopago = require('mercadopago');
const dotenv = require('dotenv');
const db = require('../database/models');
const axios = require('axios');

dotenv.config();


const paymentController = {
    
    postCreateOrder: async (req, res) => {
        
        try {
            mercadopago.configure({
                access_token: process.env.ACCESS_TOKEN || ''
            });

            const dataCheckout = req.body;
            const hostSSL = 'https://d404-206-84-81-87.ngrok-free.app';

            const items = dataCheckout.products?.map((product) => ({
                id: product.productId,
                title: product.productName,
                unit_price: product.price,
                currency_id: 'COP',
                quantity: product.quantity
            }));

            const result = await mercadopago.preferences.create({

                items: items,

                metadata: {
                    userId: dataCheckout.userId
                },

                back_urls:{
                    success: 'http://localhost:3000/',
                    failure: 'http://localhost:3000/',
                    pending: 'http://localhost:3000/',
                },

                notification_url: `${hostSSL}/payment/webhook`,
            });

            res.status(200).json(result.body.init_point);
            
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    },
    
    receiveWebhook: async (req, res) => {
        try {
            const payment = req.query;

            if (payment.type === 'payment') {

                const data = await mercadopago.payment.findById(payment['data.id']);

                try { //Disminuir stock
                    const items = data.body.additional_info.items;

                    for (const item of items) {
                        const { id, quantity } = item;
                        const parsedQuantity = parseInt(quantity);
                  
                        const product = await db.Product.findByPk(id);
                        if (product.stock < parsedQuantity) { throw new Error(`Stock insuficiente para el producto con id ${id}`); }// Verificar si el stock actual es suficiente

                        await db.Product.decrement('stock', { by: parsedQuantity, where: { product_id: id } });
                      }
                    } catch (error) {
                        console.error('Error al actualizar el stock:', error);
                    }

                    const userId = data.response.metadata.user_id;

                    await axios.post('http://localhost:4000/cart/empty', { userId: userId });


                    //Creación de orden
                    const createOrder = await db.Order.create({ 
                        user_id: data.response.metadata.user_id,
                        status: data.response.status,
                        total_amount: data.response.transaction_amount,
                        order_date: data.response.date_created,
                        payment_method: data.response.payment_method_id,
                        payment_email: data.response.payer.email,
                        phone_number: data.response.payer.phone.number || null
                    });

                    const orderId = createOrder.order_id;
                    const items = data.response.additional_info.items;


                    const orderDetailPromises = items.map(async (item) => {
                        await db.OrderDetail.create({
                            order_id: orderId,
                            product_id: item.id,
                            quantity: item.quantity,
                            price: item.unit_price
                        }, { raw: true });
                    });

                    await Promise.all(orderDetailPromises);

                    await db.TransactionDetail.create({
                        transaction_id: data.response.id,
                        amount: data.response.transaction_amount,
                        status: data.response.status,
                        order_id: orderId,
                        user_id: data.response.metadata.user_id,
                        net_received_amount: data.response.transaction_details.net_received_amount,
                        method_payment: data.response.payment_method_id,
                        transaction_date: data.response.date_created
                    });
                }
    
           res.sendStatus(204);
            
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        };
    },

    getPayments: async (req, res) => {
        const payments = await db.TransactionDetail.findAll({
            include: [
                {
                    model: db.User,
                    as: 'transactionUser',
                    attributes: ['first_name', 'middle_name', 'last_name']
                }
            ],
            raw: true ,
            nest: true
        });

        if(!payments) { return res.status(404).json({ message: 'No se encontraron pagos en linea' }); };

        const paymentsMapped = payments.map((pay) => ({
            fullName: `${pay.transactionUser.first_name} ${pay?.transactionUser.middle_name} ${pay.transactionUser.last_name}`,
            trasactionId: pay.transaction_id,
            orderId: pay.order_id,
            amount: pay.amount,
            status: pay.status,
            methodPayment: pay.method_payment,
            amountNeto: pay.net_received_amount,
            trasactionDate: pay.transaction_date
        }));

        res.status(200).json({ payments: paymentsMapped });
    }
};

module.exports = paymentController;