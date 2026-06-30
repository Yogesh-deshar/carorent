import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    VehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    BookingFrom: {
      type: Date,
      required: true,
    },
    BookingTo: {
      type: Date,
      required: true,
    },
    BookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "returned"],
      default: "pending",
    },
 
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
