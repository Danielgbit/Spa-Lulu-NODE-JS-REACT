const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.get('/all', orderController.getOrders);

router.get('/detail/:id', orderController.getOrder);

router.get('/products/detail/:id', orderController.getOrderProducts);

router.delete('/order/delete/:id', orderController.deleteOrder);



module.exports = router;