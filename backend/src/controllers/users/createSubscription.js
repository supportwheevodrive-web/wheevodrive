const razorpayInstance = require("../../../config/razorpay");
const { SUBRIPTION_PLANS } = require("../../constants/constants");

module.exports.createSubscription = async (req, res) => {
  try {
    const { plan, currency = "INR", receipt, userId } = req.body;

    const selectedPlan = Object.values(SUBRIPTION_PLANS).find(
      (p) => p.TITLE === plan
    );
    if (!selectedPlan || !selectedPlan.amount) {
      return res.status(400).send({ message: "Invalid subscription plan" });
    }

    const options = {
      amount: selectedPlan.amount * 100,
      currency: currency,
      receipt: receipt,
      notes: {
        plan: selectedPlan.TITLE,
        userId: userId ?? "",
      },
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log("Error while creating subscription : ", error);
    res.status(500).send({ message: "Error while creating subscription" });
  }
};
