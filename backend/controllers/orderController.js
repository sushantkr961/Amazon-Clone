const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ObjectId = require("mongodb").ObjectId;

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: new ObjectId(req.user._id) });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt") // - is used because i don't want those data
      .orFail();
    res.send(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { cartItems, orderTotal, paymentMethod } = req.body;
    if (!(cartItems && orderTotal && paymentMethod)) {
      return res.status(400).send("All inputs are required");
    }

    let ids = cartItems.map((item) => {
      return item.productID;
    });
    let qty = cartItems.map((item) => {
      return Number(item.quantity);
    });

    await Product.find({ _id: { $in: ids } }).then((products) => {
      products.forEach(function (product, idx) {
        product.sales += qty[idx];
        product.save();
      });
    });

    const order = new Order({
      user: new ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
    });

    const createdOrder = await order.save();
    res.status(201).send(createdOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// update delivery is an admin routes
const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// get all orders for admin routes only
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password")
      .sort({ paymentMethod: "desc" });

    res.send(orders);
  } catch (error) {
    next(error);
  }
};

// all analysis for generating revenue on chart for admin only
const getOrderForAnalysis = async (req, res, next) => {
  // console.log(new Date().toISOString().substring(0,10)) // 2022-04-14 is output
  try {
    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0); // it will start form 00:00AM for particular date

    const end = new Date(req.params.date);
    end.setHours(23, 59, 59, 999); // it will end at 12:59PM for a particular date

    const order = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: "asc" });

    res.send(order);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderForAnalysis,
};
