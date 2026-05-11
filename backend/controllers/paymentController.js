const axios = require('axios');
const Payment = require('../models/paymentModel');
const catchAsync = require("../utils/catchAsync");

exports.verifyPayment = async (req, res, next) => {
  const { reference, billingDetails, items, amount } = req.body;

  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = response.data.data;

  if (data.status !== 'success') {
    return next(new AppError('Payment not successful', 400));
  }

  // ✅ Prevent duplicate payments
  const existing = await Payment.findOne({ reference });
  if (existing) {
    return res.status(200).json({
      status: 'success',
      message: 'Payment already verified',
    });
  }

  // ✅ Save payment
  const payment = await Payment.create({
    user: req.user._id,
    reference,
    amount: data.amount / 100, // convert from kobo
    status: 'success',
    billingDetails,
    items,
    paidAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'Payment verified',
    data: payment,
  });
};

exports.getAllPayments = catchAsync(async (req, res, next) => {
  const payments = await Payment.find();

  res.status(200).json({
    status: "success",
    results: payments.length,
    data: {
      payments,
    },
  });
});