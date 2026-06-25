const { sentOTPTemplate } = require("../../../email-templates/otp-template");
const OTP = require("../../../models/users/otpModel");
const User = require("../../../models/users/userSchema");
const {
  conflictResponse,
  successResponse,
  badRequestResponse,
} = require("../../utils/responseHelpers");
const { generateOTP, sendEmail } = require("../../utils/utils");
require("dotenv").config();

module.exports = {
  sendSignupOTP: async (req, res, next) => {
    try {
      const { email } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json(conflictResponse("Email already registered"));
      }

      const otp = generateOTP();

      await OTP.deleteOne({ email });

      const newOTP = new OTP({
        email,
        otp,
        verified: false,
      });

      await newOTP.save();

      let htmlContent = sentOTPTemplate(otp);
      await sendEmail(
        process.env.EMAIL_USER,
        "Your OTP for WheevoDrive Signup",
        htmlContent,
        htmlContent,
        email
      );

      res
        .status(200)
        .json(successResponse({ message: "OTP sent successfully" }));
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json(badRequestResponse("Failed to send OTP"));
    }
  },

  verifySignupOTP: async (req, res, next) => {
    try {
      const { email, otp } = req.body;

      const otpDoc = await OTP.findOne({ email });

      if (!otpDoc) {
        return res
          .status(400)
          .json(badRequestResponse("OTP expired or invalid"));
      }

      if (otpDoc.otp !== otp) {
        return res.status(400).json(badRequestResponse("Invalid OTP"));
      }

      otpDoc.verified = true;
      await otpDoc.save();

      res
        .status(200)
        .json(successResponse({ message: "OTP verified successfully" }));
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json(badRequestResponse("Failed to verify OTP"));
    }
  },

  Signup: async (req, res, next) => {
    try {
      const { email, phone, password } = req.body;

      const otpDoc = await OTP.findOne({ email, verified: true });
      if (!otpDoc) {
        return res.status(400).json(badRequestResponse("Email not verified"));
      }

      const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
      });
      if (existingUser) {
        return res.status(409).json(conflictResponse());
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ ...req.body, password: hashedPassword });
      const token = createSecretToken(user._id);

      await OTP.deleteOne({ email });

      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      const data = { user };
      res.status(200).json(successResponse(data));
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json(badRequestResponse("Signup failed"));
    }
  },
};
