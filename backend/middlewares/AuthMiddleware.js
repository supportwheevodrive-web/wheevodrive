require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users/userSchema");
const { SUBRIPTION_PLANS } = require("../src/constants/constants");
module.exports.userVerification = (req, res, next) => {
  const token =
    req.headers["authorization"]?.split(" ")[1] ||
    req.body.token ||
    req.cookies.token;

  if (!token) {
    return res.json({ status: 403, message: "Forebidden" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);

      if (user) {
        req.user = user;
        req.userId = user._id;
        subscribed = user?.subscribed ?? false;
        subscription_plan =
          user?.subscription_plan ?? SUBRIPTION_PLANS.FREE.TITLE;
        next();
      } else {
        return res.json({ status: false });
      }
    }
  });
};
