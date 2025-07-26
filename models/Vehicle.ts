import mongoose from "mongoose"

const VehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["sedan", "suv", "hatchback", "truck", "van"],
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    mileage: {
      type: Number,
      default: 0,
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid"],
      default: "petrol",
    },
    transmission: {
      type: String,
      enum: ["manual", "automatic"],
      default: "manual",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
)

VehicleSchema.index({ location: "2dsphere" })

export default mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema)
