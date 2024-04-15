const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController')


router.post('/create-order', paymentController.postCreateOrder);

router.post('/webhook', paymentController.receiveWebhook);

router.get('/all', paymentController.getPayments);



module.exports = router;