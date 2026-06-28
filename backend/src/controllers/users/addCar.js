const { cloudinary } = require("../../../config/cloudinary");
const Cars = require("../../../models/users/carSchema");
const { v4: uuidv4 } = require("uuid");

module.exports.addCar = async (req, res) => {
  try {
    let carData = req.body;

    carData.dealer_id = req.user._id;
    let additionalImageUrls = [];

    carData.place = req.body.place;
    const additionalImages = req.body.images;

    for (let image of additionalImages) {
      const additionalImageResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "cloudinary_react",
        public_id: `${Date.now()}_additional`,
      });
      additionalImageUrls.push(additionalImageResponse.url);
    }

    carData.images = additionalImageUrls;

    let response = await Cars.create(carData);
    res.send(response);
  } catch (error) {
    console.log("ERROR==============", error);
    res.status(500).send({ error: "Error uploading images" });
  }
};
