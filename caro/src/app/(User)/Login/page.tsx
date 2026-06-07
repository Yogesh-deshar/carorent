"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuth } from "@/lib/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          Email: email,
          Password: password,
        },
      );

      const { token, user } = response.data;
      setAuth(token, user);

      if (user.Role === "admin") {
        router.push("/Dashboard");
      } else {
        router.push("/Home");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="email" className="mt-4">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label htmlFor="password" className="mt-4">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <Button
            className="bg-green-400 w-full mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-4 text-end">
          do not have a account ?
          <Link href="/Register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </section>
    </>
  );
};

export default LoginPage;
