import Booking from "../model/booking.model.js";
import Vehicle from "../model/vehicles.model.js";

const VALID_STATUSES = ["pending", "confirmed", "cancelled", "returned"];

const syncVehicleForBooking = async (booking, status) => {
  const vehicleId = booking.VehicleId?._id ?? booking.VehicleId;
  const userId = booking.UserId?._id ?? booking.UserId;

  if (status === "confirmed") {
    await Vehicle.findByIdAndUpdate(vehicleId, {
      VehiclesBooked: true,
      VehiclesBookedBy: String(userId),
      VehiclesBookedFrom: booking.BookingFrom,
      VehiclesBookedTo: booking.BookingTo,
    });
  } else if (status === "cancelled" || status === "returned") {
    await Vehicle.findByIdAndUpdate(vehicleId, {
      VehiclesBooked: false,
      VehiclesBookedBy: "",
      VehiclesBookedFrom: null,
      VehiclesBookedTo: null,
    });
  }
};

const addBooking = async (req, res) => {
  try {
    const { UserId, VehicleId, BookingFrom, BookingTo, BookingStatus } =
      req.body;

    if (!UserId || !VehicleId || !BookingFrom || !BookingTo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const fromDate = new Date(BookingFrom);
    const toDate = new Date(BookingTo);

    if (fromDate >= toDate) {
      return res
        .status(400)
        .json({ message: "BookingFrom must be before BookingTo" });
    }

    if (BookingStatus && !VALID_STATUSES.includes(BookingStatus)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const newBooking = await Booking.create({
      UserId,
      VehicleId,
      BookingFrom: fromDate,
      BookingTo: toDate,
      ...(BookingStatus && { BookingStatus }),
    });

    res.status(201).json({
      message: "Booking added successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("VehicleId")
      .populate("UserId", "-Password");

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("VehicleId")
      .populate("UserId", "-Password");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ UserId: userId }).populate(
      "VehicleId",
    );

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { BookingFrom, BookingTo, BookingStatus } = req.body;

    const existingBooking = await Booking.findById(id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const updates = {};

    if (BookingFrom !== undefined) {
      updates.BookingFrom = new Date(BookingFrom);
    }
    if (BookingTo !== undefined) {
      updates.BookingTo = new Date(BookingTo);
    }
    if (BookingStatus !== undefined) {
      if (!VALID_STATUSES.includes(BookingStatus)) {
        return res.status(400).json({ message: "Invalid booking status" });
      }
      updates.BookingStatus = BookingStatus;
    }

    const fromDate = updates.BookingFrom ?? existingBooking.BookingFrom;
    const toDate = updates.BookingTo ?? existingBooking.BookingTo;

    if (fromDate >= toDate) {
      return res
        .status(400)
        .json({ message: "BookingFrom must be before BookingTo" });
    }

    const booking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("VehicleId")
      .populate("UserId", "-Password");

    if (updates.BookingStatus) {
      await syncVehicleForBooking(
        {
          VehicleId: existingBooking.VehicleId,
          UserId: existingBooking.UserId,
          BookingFrom: fromDate,
          BookingTo: toDate,
        },
        updates.BookingStatus,
      );
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  addBooking,
  fetchBookings,
  fetchBookingById,
  fetchBookingsByUser,
  updateBooking,
  deleteBooking,
};
