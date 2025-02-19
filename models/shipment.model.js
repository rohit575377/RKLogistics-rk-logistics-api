import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    shipper: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    carrier: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const shipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    weight: Number,
    description: String,
    shipper: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    carrier: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: {
      type: String,
      enum: [
        "created",
        "expired",
        "pending",
        "bidding",
        "assigned",
        "in-transit",
        "delivered",
        "completed",
      ],
      default: "created",
    },
    bids: [bidSchema],
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;