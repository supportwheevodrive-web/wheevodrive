const { default: razorpayInstance } = require("../../../config/razorpay");

module.exports.createSubscription = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: receipt,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send({ message: "Error while creating subscription" });
  }
};
