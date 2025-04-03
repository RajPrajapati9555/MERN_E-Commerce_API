import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};

//verify, save to db
export const verify = async (req, res) => {
  const {
    orderId,
    payment_id,
    payment_Signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;
  let orderConfirm = await Payment.create({
    orderId,
    payment_id,
    payment_Signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });
  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

//user specificOrder
export const userOrder = async (req, res) => {
  let userId = req.user._id.toString();
  let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 });
  res.json(orders);
};

export const allOrders = async (req, res) => {
  let orders = await Payment.find().sort({ orderDate: -1 });
  res.json(orders);
};
