const express = require("express");
const router = express.Router();

const {
  getPayments,
  createPayment
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getPayments);
router.post("/", protect, createPayment);

module.exports = router;