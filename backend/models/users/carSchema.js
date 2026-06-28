const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    dealer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car_name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuel_type: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "Other"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic", "Other"],
      required: true,
    },
    body_type: {
      type: String,
      enum: [
        "Sedan",
        "SUV",
        "Truck",
        "Hatchback",
        "Coupe",
        "Convertible",
        "Van",
        "Other",
      ],
      required: true,
    },
    condition: {
      type: String,
      enum: [
        "New",
        "Like New",
        "Excellent",
        "Good",
        "Fair",
        "Poor",
        "Needs Repair",
        "For Parts Only",
        "Other",
      ],
      required: true,
    },
    description: {
      type: String,
    },
    place: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    seats: {
      type: Number,
      required: true,
    },
    engine_size: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },
    is_negotiable: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Add to your schema file
CarSchema.index({
  status: 1,
  created_at: -1,
});

CarSchema.index({
  status: 1,
  brand: 1,
  model: 1,
});

CarSchema.index({
  status: 1,
  price: 1,
});

CarSchema.index({
  status: 1,
  year: 1,
  brand: 1,
});

// Text index for search
CarSchema.index(
  {
    car_name: "text",
    description: "text",
  },
  {
    weights: {
      car_name: 10,
      description: 5,
    },
    name: "TextIndex",
  }
);

// Compound indexes for common filter combinations
CarSchema.index({
  status: 1,
  fuel_type: 1,
  transmission: 1,
  body_type: 1,
});

// Partial index for available cars only
CarSchema.index(
  { price: 1, created_at: -1 },
  { partialFilterExpression: { status: "Available" } }
);

const Cars = mongoose.model("Cars", CarSchema);
module.exports = Cars;
