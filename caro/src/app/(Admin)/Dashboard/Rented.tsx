"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

interface Vehicle {
  _id: string;
  Path: string;
  VehiclesName: string;
  VehiclesModel: string;
  VehiclesType: string;
  VehiclesWheel: string;
  VehiclesPrice: string;
  VehiclesBooked: boolean;
}

interface User {
  _id: string;
  username: string;
  Email: string;
}

interface Booking {
  _id: string;
  BookingStatus: "pending" | "confirmed" | "cancelled" | "returned";
  BookingFrom: string;
  BookingTo: string;
  VehicleId: Vehicle | null;
  UserId: User | null;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const Rented = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/bookings/fetchbooking",
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load bookings");
      }

      setBookings(data.bookings || []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateBookingStatus = async (
    bookingId: string,
    status: "confirmed" | "cancelled" | "returned",
  ) => {
    setUpdatingId(bookingId);

    try {
      const response = await fetch(
        `http://localhost:8000/api/bookings/update/${bookingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ BookingStatus: status }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update booking");
      }

      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update booking");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="mt-6 p-3">
      <div className="bg-white rounded-2xl w-full p-3">
        <h2 className="text-4xl">Rented Cars</h2>
      </div>

      <main className="mt-6 bg-white rounded-2xl p-3 overflow-x-auto">
        {loading ? (
          <div className="p-6 text-xl text-gray-600">Loading bookings...</div>
        ) : error ? (
          <div className="p-6 text-xl text-red-600">{error}</div>
        ) : (
          <table
            className="text-start w-full min-w-[1200px]"
            style={{
              tableLayout: "fixed",
              borderSpacing: "0 8px",
              borderCollapse: "separate",
            }}
          >
            <thead className="border-b-2">
              <tr className="text-left text-[18px]">
                <th className="border-b-2 border-gray-200 py-2">Image</th>
                <th className="border-b-2 border-gray-200 py-2">Car Name</th>
                <th className="border-b-2 border-gray-200 py-2">Model</th>
                <th className="border-b-2 border-gray-200 py-2">Type</th>
                <th className="border-b-2 border-gray-200 py-2">Wheel</th>
                <th className="border-b-2 border-gray-200 py-2">Price</th>
                <th className="border-b-2 border-gray-200 py-2">Rented By</th>
                <th className="border-b-2 border-gray-200 py-2">Rented From</th>
                <th className="border-b-2 border-gray-200 py-2">Rented To</th>
                <th className="border-b-2 border-gray-200 py-2">Status</th>
                <th className="border-b-2 border-gray-200 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-6 text-center text-gray-600">
                    No rental bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => {
                  const vehicle = booking.VehicleId;
                  const user = booking.UserId;
                  const isPending = booking.BookingStatus === "pending";
                  const isConfirmed = booking.BookingStatus === "confirmed";
                  const isUpdating = updatingId === booking._id;

                  if (!vehicle) return null;

                  return (
                    <tr key={booking._id}>
                      <td className="py-3">
                        <img
                          src={
                            vehicle.Path
                              ? `http://localhost:8000${vehicle.Path}`
                              : "/placeholder.png"
                          }
                          alt={vehicle.VehiclesName}
                          className="w-20 aspect-square object-cover rounded-lg"
                        />
                      </td>
                      <td className="py-3">{vehicle.VehiclesName}</td>
                      <td className="py-3">{vehicle.VehiclesModel}</td>
                      <td className="py-3">{vehicle.VehiclesType}</td>
                      <td className="py-3">{vehicle.VehiclesWheel}</td>
                      <td className="py-3">{vehicle.VehiclesPrice}</td>
                      <td className="py-3">
                        {user ? (
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-gray-500">
                              {user.Email}
                            </p>
                          </div>
                        ) : (
                          "Unknown"
                        )}
                      </td>
                      <td className="py-3">
                        {formatDate(booking.BookingFrom)}
                      </td>
                      <td className="py-3">{formatDate(booking.BookingTo)}</td>
                      <td className="py-3 capitalize">
                        {booking.BookingStatus}
                      </td>
                      <td className="py-3">
                        {isPending && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                              disabled={isUpdating}
                              onClick={() =>
                                updateBookingStatus(booking._id, "confirmed")
                              }
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              disabled={isUpdating}
                              onClick={() =>
                                updateBookingStatus(booking._id, "cancelled")
                              }
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        {isConfirmed && (
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600"
                            disabled={isUpdating}
                            onClick={() =>
                              updateBookingStatus(booking._id, "returned")
                            }
                          >
                            Return
                          </Button>
                        )}
                        {!isPending && !isConfirmed && (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </main>
    </section>
  );
};

export default Rented;
