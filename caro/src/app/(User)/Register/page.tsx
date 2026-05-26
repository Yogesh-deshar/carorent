import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section
        className=" mt-10 m-auto w-[400px] p-3"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <h1>Register</h1>
        <Label htmlFor="username" className="mt-4">
          Name
        </Label>
        <Input id="username" type="text" placeholder="Name" className="mt-2" />

        <Label htmlFor="phone" className="mt-4">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="text"
          placeholder="Phone Number"
          className="mt-2"
        />

        <Label htmlFor="address" className="mt-4">
          Address
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="Address"
          className="mt-2"
        />

        <Label htmlFor="driving-license" className="mt-4">
          Driving License
        </Label>
        <Input
          id="driving-license"
          type="text"
          placeholder="Driving License"
          className="mt-2"
        />

        <Label htmlFor="email" className="mt-4">
          Email
        </Label>
        <Input id="email" type="email" placeholder="Email" className="mt-2" />

        <Label htmlFor="password" className="mt-4">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          className="mt-2"
        />

        <Label htmlFor="confirmPassword" className="mt-4">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="mt-2"
        />

        <Button className="bg-green-400 w-full mt-4">Sign up</Button>

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

export default page;
