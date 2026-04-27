const Payment = require("../models/Payment");

const getPayments = async (req, res) => {
  const payments = await Payment.find({
    user: req.user._id
  });

  res.json(payments);
};

const createPayment = async (req, res) => {
  const payment = await Payment.create({
    user: req.user._id,
    amount: req.body.amount,
    status: "Paid"
  });

  res.status(201).json(payment);
};

module.exports = {
  getPayments,
  createPayment
};