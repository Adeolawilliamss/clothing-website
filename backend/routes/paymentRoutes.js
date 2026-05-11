const express = require('express');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController')

//SUB MIDDLEWARE FOR THIS MINI-APPLICATION
const router = express.Router();

router.post('/verify', paymentController.verifyPayment);

router.use(authController.protect);

router.get(
  "/",
  authController.restrictTo("admin"),
  paymentController.getAllPayments
);

module.exports = router;