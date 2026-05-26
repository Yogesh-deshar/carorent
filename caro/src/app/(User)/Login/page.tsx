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
        <h1>Login</h1>
        <Label htmlFor="username" className="mt-4">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Username"
          className="mt-2"
        />
        <Label htmlFor="password" className="mt-4">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          className="mt-2"
        />

        <Button className="bg-green-400 w-full mt-4">Sign in</Button>

        <p className="text-sm text-muted-foreground mt-4 text-end">
          do n't have a account ? 
          <Link href="/Register" className="text-blue-500 hover:underline">
             Sign up
          </Link>
        </p>
      </section>
    </>
  );
};

export default page;
