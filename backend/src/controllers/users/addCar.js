const { cloudinary } = require("../../../config/cloudinary");
const Cars = require("../../../models/users/carSchema");
const { SUBRIPTION_PLANS } = require("../../constants/constants");

module.exports.addCar = async (req, res) => {
  try {
    const carData = {
      ...req.body,
      dealer_id: req.user._id,
      place: req.body.place,
    };

    const dealer = req.user;

    const dealerCarCount = await Cars.countDocuments({
      dealer_id: dealer._id,
    });

    if (!dealer?.subscribed) {
      if (dealerCarCount >= 5) {
        return res
          .status(403)
          .send({ message: "Please take a subscription to add more cars." });
      }
    } else if (
      dealer.subscription_plan === SUBRIPTION_PLANS.PRO.TITLE &&
      dealerCarCount >= 20
    ) {
      return res.status(403).send({
        message: "Please upgrade your plan to add more cars.",
      });
    }

    const images = req.body.images || [];

    carData.images = await Promise.all(
      images.map(async (image, index) => {
        const response = await cloudinary.uploader.upload(image, {
          upload_preset: "cloudinary_react",
          public_id: `${Date.now()}_${index}`,
        });

        return response.secure_url;
      })
    );

    const response = await Cars.create(carData);

    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "Error uploading images",
    });
  }
};
