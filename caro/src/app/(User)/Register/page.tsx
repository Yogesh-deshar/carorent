"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import  { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [userdata, setUserdata] = useState({
    name: "",
    phone: "",
    address: "",
    drivingLicense: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (userdata.password !== userdata.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      username: userdata.name,
      PhoneNumber: Number(userdata.phone),
      Address: userdata.address,
      DrivingLicenseNumber: userdata.drivingLicense,
      Email: userdata.email,
      Password: userdata.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        payload,
      );
      console.log(response.data);
      router.push("/Login");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
      <section
        className=" mt-10 m-auto w-[400px] p-3"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="username" className="mt-4">
            Name
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Name"
            className="mt-2"
            onChange={(e) => setUserdata({ ...userdata, name: e.target.value })}
          />

          <Label htmlFor="phone" className="mt-4">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="text"
            placeholder="Phone Number"
            className="mt-2"
            onChange={(e) =>
              setUserdata({ ...userdata, phone: e.target.value })
            }
          />

          <Label htmlFor="address" className="mt-4">
            Address
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Address"
            className="mt-2"
            onChange={(e) =>
              setUserdata({ ...userdata, address: e.target.value })
            }
          />

          <Label htmlFor="driving-license" className="mt-4">
            Driving License
          </Label>
          <Input
            id="driving-license"
            type="text"
            placeholder="Driving License"
            className="mt-2"
            onChange={(e) =>
              setUserdata({ ...userdata, drivingLicense: e.target.value })
            }
          />

          <Label htmlFor="email" className="mt-4">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="mt-2"
            onChange={(e) =>
              setUserdata({ ...userdata, email: e.target.value })
            }
          />

          <Label htmlFor="password" className="mt-4">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="mt-2"
            onChange={(e) =>
              setUserdata({ ...userdata, password: e.target.value })
            }
          />

          <Label htmlFor="confirmPassword" className="mt-4">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="mt-2"
            onChange={(e) =>
              setUserdata({ ...userdata, confirmPassword: e.target.value })
            }
          />

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <Button className="bg-green-400 w-full mt-4" type="submit">
            Sign up
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-4 text-end">
          already have a account ?
          <Link href="/Login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </section>
    </>
  );
};

export default RegisterPage;
