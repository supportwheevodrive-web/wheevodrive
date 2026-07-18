const crypto = require("crypto");
const razorpayInstance = require("../../../config/razorpay");
const { SUBRIPTION_PLANS } = require("../../constants/constants");
const User = require("../../../models/users/userSchema");
const {
  subscriptionConfirmationEmail,
} = require("../../../email-templates/subsription-confirmation-email");
const { sendEmail } = require("../../utils/utils");

module.exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .send({ success: false, message: "Missing payment details" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const signatureIsValid =
      expectedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(razorpay_signature)
      );

    if (!signatureIsValid) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid payment signature" });
    }

    // The order's notes (set at creation time) are the trusted source for
    // which plan was paid for and by whom — not the request body.
    const order = await razorpayInstance.orders.fetch(razorpay_order_id);
    const plan = order?.notes?.plan ?? req.body.plan;
    const userId = order?.notes?.userId || req.body.userId;

    const selectedPlan = Object.values(SUBRIPTION_PLANS).find(
      (p) => p.TITLE === plan
    );
    if (!selectedPlan || !selectedPlan.amount) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid subscription plan" });
    }
    if (order.amount !== selectedPlan.amount * 100) {
      return res
        .status(400)
        .send({ success: false, message: "Payment amount mismatch" });
    }

    if (!userId) {
      return res
        .status(400)
        .send({ success: false, message: "Missing user for subscription" });
    }

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        subscription_plan: selectedPlan.TITLE,
        subscribed: true,
        subscription_expires_at: expiresAt,
        subsciptionRemainderSent: false,
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found!" });
    }

    try {
      const formattedDate = expiresAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const htmlContent = subscriptionConfirmationEmail(
        user.username,
        selectedPlan.TITLE,
        formattedDate
      );
      await sendEmail(
        user.email,
        `Your ${selectedPlan.TITLE} plan confirmation`,
        `Your ${selectedPlan.TITLE} plan is active until ${formattedDate}.`,
        htmlContent,
        user.email
      );
    } catch (emailError) {
      console.log("Error sending subscription email : ", emailError);
    }

    res.status(200).send({
      success: true,
      message: "Payment verified and subscription activated",
      plan: selectedPlan.TITLE,
    });
  } catch (error) {
    console.log("Error while verifying payment : ", error);
    res
      .status(500)
      .send({ success: false, message: "Error while verifying payment" });
  }
};
