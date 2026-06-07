import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    PhoneNumber: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
    },

    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    DrivingLicenseNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 20,
    },

    Address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    Role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
