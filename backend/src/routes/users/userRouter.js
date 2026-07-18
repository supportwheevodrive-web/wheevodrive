const express = require("express");
const { SignIn } = require("../../controllers/users/signin");
const { Signup } = require("../../controllers/users/signupbkp");
const { getProfile } = require("../../controllers/users/getProfile");
const { userVerification } = require("../../../middlewares/AuthMiddleware");
const { getCars } = require("../../controllers/users/getCars");
const { addCar } = require("../../controllers/users/addCar");
const {
  getCarByDealerId,
} = require("../../controllers/users/getCarByDealerId");
const { getCarById } = require("../../controllers/users/getCarById");
const { getMe } = require("../../controllers/users/getMe");
const { updateCar } = require("../../controllers/users/updateCar");
const { deleteCarById } = require("../../controllers/users/deleteCarById");
const { updateProfile } = require("../../controllers/users/updateProfile");
const { searchCar } = require("../../controllers/users/searchCar");
const { getStatusCount } = require("../../controllers/users/getStatusCount");
const { getSavedCars } = require("../../controllers/users/getSavedCars");
const { addReview } = require("../../controllers/users/addReview");
const { getReviews } = require("../../controllers/users/getReviews");
const { NewsLetter } = require("../../controllers/users/NewsLetter");
const { getSubscribers } = require("../../controllers/users/getSubscribers");
const {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  addChatUser,
} = require("../../controllers/messages/messageController");
const { forgotPassword } = require("../../controllers/users/forgotPassword");
const { resetPassword } = require("../../controllers/users/resetPassword");
const {
  sendSignupOTP,
  verifySignupOTP,
} = require("../../controllers/users/signup");
const { addViewsCount } = require("../../controllers/users/addViewsCount");
const { Logout } = require("../../controllers/users/logout");
const { sentFeedback } = require("../../controllers/users/sentFeedback");
const {
  getDashboardStats,
} = require("../../controllers/users/getDashboardStats");
const {
  getDashboardGraphStats,
} = require("../../controllers/users/getDashboardGraphStats");
const { createPaymentIntent } = require("../../controllers/users/payment");
const {
  updatePlanConfirmation,
} = require("../../controllers/users/updatePlanConfirmation");
const {
  createSubscription,
} = require("../../controllers/users/createSubscription");
const { verifyPayment } = require("../../controllers/users/verifyPayment");

const router = express.Router();

router.get("/", (req, res) => {
  const data = userVerification();
  res.send("User router called");
});

router.post("/me", getMe);

// Auth related routes
router.post("/signin", SignIn);
router.post("/logout", Logout);
router.post("/otp/send", sendSignupOTP);
router.post("/otp/verify", verifySignupOTP);
router.post("/signup", Signup);
router.get("/profile", getProfile);
router.patch("/profile/:id", updateProfile);
router.post("/reset-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/cars", getCars);
router.post("/car", userVerification, addCar);
router.patch("/car/:id", updateCar);
router.get("/cars/me", userVerification, async (req, res) => {
  const dealerId = req.user._id;
  const cars = await getCarByDealerId(dealerId);
  res.send(cars);
});

router.get("/car/search", searchCar);

router.delete("/car/:id", deleteCarById);

router.get("/car/stats-count", getStatusCount);

router.get("/car/:id", getCarById);

router.get("/cars/dealer/:id", async (req, res) => {
  const dealerId = req.params.id;
  const cars = await getCarByDealerId(dealerId);
  res.send(cars);
});

router.post("/car/saved", getSavedCars);

router.post("/reviews", addReview);
router.get("/reviews", getReviews);
router.post("/subscribe", NewsLetter);
router.get("/subscribers", getSubscribers);

// Chat related routes
// router.get("/message/users", userVerification, getUsersForSidebar);
router.post("/message/user/add", userVerification, addChatUser);
router.get("/message/users", userVerification, getUsersForSidebar);
router.get("/message/:id", userVerification, getMessages);

router.post("/message/send/:id", userVerification, sendMessage);

router.post("/add-views-count/:id", addViewsCount);

router.post("/feedback", sentFeedback);

router.get("/dashboard/:id/stats", getDashboardStats);
router.get("/dashboard/:id/graph", getDashboardGraphStats);

router.post("/create-payment-intent", createPaymentIntent);

router.post("/plan-confirmation/:id", updatePlanConfirmation);

// Payment integration
router.post("/create-subscription", createSubscription);
router.post("/verify-payment", verifyPayment);

module.exports = router;
