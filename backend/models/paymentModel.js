const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    reference: {
      type: String,
      required: true,
      unique: true, // prevents duplicate payments
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      default: "paystack",
    },

    billingDetails: {
      name: String,
      email: String,
      number: String,
      address: String,
      city: String,
      postalCode: String,
    },

    items: [
      {
        title: String,
        price: Number,
        quantity: Number,
      },
    ],

    paidAt: Date,
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
