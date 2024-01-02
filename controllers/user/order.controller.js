const { Order } = require("../../models/Order.model");
const { Payment } = require("../../models/Payment.model");

exports.addToCart = async (req, res) => {
  try {
    const { orderPrice, customer, orderItems, address } = req.body;
    console.log(req.body);
    if (!orderPrice || !customer || !orderItems || !address) {
      return res.status(400).json({ message: "Something is missing " });
    }
    const resp = await Order.create({
      orderPrice,
      customer,
      orderItems,
      address,
    });
    const payment = await Payment.create({ orderId: resp._id });
    return res
      .status(200)
      .json({
        message: "Order successful !",
        totalPrice: resp.orderPrice,
        items: resp.orderItems,
        paymentId: payment.orderId,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
