import { Router } from "express";
import {
  addBooking,
  fetchBookings,
  fetchBookingById,
  fetchBookingsByUser,
  updateBooking,
  deleteBooking,
} from "../controller/booking.controller.js";

const router = Router();

router.route("/add").post(addBooking);
router.route("/fetchbooking").get(fetchBookings);
router.route("/fetchbooking/user/:userId").get(fetchBookingsByUser);
router.route("/fetchbooking/:id").get(fetchBookingById);
router.route("/update/:id").put(updateBooking);
router.route("/delete/:id").delete(deleteBooking);

export default router;
