"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthUser, getAuthToken, getAuthUser, setAuth } from "@/lib/auth";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const Edit = ({ onUpdated }: { onUpdated?: () => void }) => {
  const { id } = useParams();
  const userId = id as string;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:8000/api/users/fetchuser/${userId}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load user");
        }

        const user = data.user as AuthUser;
        setUsername(user.username || "");
        setEmail(user.Email || "");
        setPhoneNumber(String(user.PhoneNumber ?? ""));
        setDrivingLicense(user.DrivingLicenseNumber || "");
        setAddress(user.Address || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const payload: Record<string, string | number> = {
        username,
        Email: email,
        PhoneNumber: Number(phoneNumber),
        DrivingLicenseNumber: drivingLicense,
        Address: address,
      };

      if (password.trim()) {
        payload.Password = password;
      }

      const response = await fetch(
        `http://localhost:8000/api/users/update/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update profile");
      }

      const updatedUser = data.user as AuthUser;
      const authUser = getAuthUser();
      const token = getAuthToken();

      if (authUser?._id === userId && token) {
        setAuth(token, updatedUser);
      }

      setPassword("");
      setSuccess("Profile updated successfully");
      onUpdated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600 p-4">Loading profile...</p>;
  }

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="w-[450px] grid object-center border border-[#DEDCDC] p-4 rounded-2xl"
      >
        <p className="text-2xl">Personal Information</p>

        <Label htmlFor="username" className="mt-3">
          Name
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <Label htmlFor="email" className="mt-3">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <Label htmlFor="phone" className="mt-3">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          maxLength={10}
          required
        />

        <Label htmlFor="license" className="mt-3">
          Driving License
        </Label>
        <Input
          id="license"
          type="text"
          value={drivingLicense}
          onChange={(event) => setDrivingLicense(event.target.value)}
          required
        />

        <Label htmlFor="password" className="mt-3">
          New Password (optional)
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Leave blank to keep current password"
        />

        <p className="text-2xl mt-3">Address</p>
        <Label htmlFor="address" className="mt-3">
          Address
        </Label>
        <Input
          id="address"
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-3">{success}</p>}

        <Button
          type="submit"
          disabled={saving}
          className="mt-3 bg-green-500 p-2 w-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </section>
  );
};

export default Edit;
