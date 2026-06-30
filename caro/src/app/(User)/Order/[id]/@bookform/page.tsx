"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthUser } from "@/lib/auth";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const Bookform = () => {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;

  const [bookingFrom, setBookingFrom] = useState("");
  const [bookingTo, setBookingTo] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");

  useEffect(() => {
    const user = getAuthUser();
    if (user) {
      setName(user.username);
      setEmail(user.Email);
      setPhone(user.PhoneNumber);
      setLicense(user.DrivingLicenseNumber);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const user = getAuthUser();
    if (!user) {
      router.push("/Login");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    if (!bookingFrom || !bookingTo) {
      setError("Please select booking dates");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/bookings/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: user._id,
          VehicleId: vehicleId,
          BookingFrom: bookingFrom,
          BookingTo: bookingTo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create booking");
      }

      router.push(`/Profile/${user._id}?tab=rented`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="md:mx-30 mt-10">
      <Card>
        <CardHeader className="text-[36px]">Booking Conform Form</CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex gap-20 items-center justify-center">
            <div>
              <Label className="text-[24px]" htmlFor="name">
                Name
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Please Enter Your Name Here"
                readOnly
              />

              <Label className="text-[24px] mt-3" htmlFor="email">
                Email
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please Enter Your Email Here"
                readOnly
              />

              <Label className="text-[24px] mt-3" htmlFor="phone">
                Phone Number
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Please Enter Your Phone Number Here"
                readOnly
              />
            </div>

            <div>
              <Label className="text-[24px]" htmlFor="license">
                Driving License Number
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="text"
                id="license"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="Please Enter Your Driving License Number Here"
                readOnly
              />

              <Label className="text-[24px] mt-3" htmlFor="booking-from">
                Booking From
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="date"
                id="booking-from"
                value={bookingFrom}
                onChange={(e) => setBookingFrom(e.target.value)}
                required
              />

              <Label className="text-[24px] mt-3" htmlFor="booking-to">
                To
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="date"
                id="booking-to"
                value={bookingTo}
                onChange={(e) => setBookingTo(e.target.value)}
                min={bookingFrom || undefined}
                required
              />
            </div>
          </CardContent>

          {error && (
            <p className="text-red-500 text-center mx-20 mb-2">{error}</p>
          )}

          <div className="flex justify-between mx-20 pb-6">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                name="terms"
                id="terms"
                className="size-4"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <Label className="text-[24px]" htmlFor="terms">
                I agree to the terms and conditions
              </Label>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-400 text-white w-[155px] h-[40px] hover:bg-white hover:text-green-400 border border-green-400"
            >
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Bookform;
