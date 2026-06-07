import mongoose from "mongoose";

const vehiclesSchema = new mongoose.Schema({
  Path: {
    type: String,
    required: true,
  },
  ImageName: {
    type: String,
    required: true,
  },

  VehiclesName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  VehiclesModel: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  VehiclesYear: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  VehiclesType: {
    type: String,
    enum: ["Electric", "Petrol", "Gasoline"],
  },
  VehiclesWheel: {
    type: String,
    enum: ["2", "4"],
  },
  VehiclesEngine: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 30,
  },
  VehiclesAcceleration: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  VehiclesTopspeed: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  VehiclesSeat: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 30,
  },
  VehiclesColor: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  VehiclesPrice: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  VehiclesDetails: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  VehiclesBooked:{
    type: Boolean,
    default: false,
  },
  VehiclesBookedBy:{
    type: String,
    default: "",
  },
  VehiclesBookedFrom:{
    type: Date,
  },
  VehiclesBookedTo:{
    type: Date,
  }
});

const Vehicle = mongoose.model("Vehicle", vehiclesSchema);
export default Vehicle;
