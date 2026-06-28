const Cars = require("../../../models/users/carSchema");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

module.exports.getCars = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      order = "desc",
      search,
      make,
      model,
      year,
      priceMin,
      priceMax,
      fuel_type,
      transmission,
      body_type,
      brands,
      car_name,
      dealer_id,
      features,
    } = req.query;

    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Math.max(Number(limit), 1), 50);
    const skip = (pageNum - 1) * limitNum;

    const cacheKey = JSON.stringify(req.query);
    const cachedResult = myCache.get(cacheKey);

    if (cachedResult) {
      return res.status(200).json({
        success: true,
        data: cachedResult.data,
        pagination: cachedResult.pagination,
        fromCache: true,
      });
    }

    const filter = { status: "Available" };

    if (make) filter.brand = { $regex: `^${make}$`, $options: "i" };
    if (model) filter.model = { $regex: `^${model}$`, $options: "i" };
    if (year) filter.year = Number(year);
    if (fuel_type) filter.fuel_type = fuel_type;
    if (transmission) filter.transmission = transmission;
    if (body_type) filter.body_type = body_type;

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    if (dealer_id && dealer_id !== "undefined") {
      filter.dealer_id = dealer_id;
    }

    if (brands) {
      const brandList = Array.isArray(brands) ? brands : [brands];
      filter.brand = {
        $in: brandList.map((b) => new RegExp(`^${b.trim()}$`, "i")),
      };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (car_name) {
      const names = Array.isArray(car_name) ? car_name : [car_name];

      filter.car_name = {
        $in: names.map(
          (name) => new RegExp(name.trim().replace(/\s+/g, ".*"), "i")
        ),
      };
    }

    if (features) {
      const featureList = Array.isArray(features) ? features : [features];
      filter.features = {
        $all: featureList.map(
          (f) => new RegExp(`^${f.trim().replace(/\s+/g, "\\s*")}$`, "i")
        ),
      };
    }

    const sortFields = {
      created_at: 1,
      price: 1,
      year: 1,
      views: 1,
    };
    const sortOrder = order === "desc" ? -1 : 1;
    const sort = sortFields[sortBy]
      ? { [sortBy]: sortOrder }
      : { created_at: -1 };

    const [cars, totalCars] = await Promise.all([
      Cars.find(filter)
        .select(
          "car_name brand model year price mileage fuel_type transmission body_type condition images dealer_id created_at place views"
        )
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean()
        .maxTimeMS(5000),
      Cars.countDocuments(filter).maxTimeMS(3000),
    ]);

    const response = {
      success: true,
      data: cars,
      pagination: {
        total: totalCars,
        page: pageNum,
        pages: Math.ceil(totalCars / limitNum),
        limit: limitNum,
      },
    };

    myCache.set(cacheKey, response);

    return res.status(200).json(response);
  } catch (err) {
    console.error("Get Cars Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
