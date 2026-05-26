"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Bookform = () => {
  return (
    <>
      <section className="md:mx-30 mt-10">
        <Card>
          <CardHeader className="text-[36px]">Booking Conform Form</CardHeader>

          <CardContent className="flex gap-20 items-center justify-center">
            <div>
              <Label className="text-[24px]" htmlFor="name">
                Name
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="text"
                id="name"
                placeholder="Please Enter Your Name Here"
              />

              <Label className="text-[24px] mt-3" htmlFor="email">
                Email
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="email"
                id="email"
                placeholder="Please Enter Your Email Here"
              />

              <Label className="text-[24px] mt-3" htmlFor="number">
                Phone Number
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="number"
                maxLength={10}
                name=""
                id=""
                placeholder="Please Enter Your Phone Number Here"
              />
            </div>

            <div>
              <Label className="text-[24px]" htmlFor="name">
                Driving License Number
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="text"
                id="name"
                placeholder="Please Enter Your Driving License Number Here"
              />

              <Label className="text-[24px] mt-3" htmlFor="email">
                Booking From
              </Label>
              <Input
                className="w-[510px] border border-black"
                type="date"
                id="booking"
              />

              <Label className="text-[24px] mt-3" htmlFor="number">
                To
              </Label>
              <Input
                className="w-[510px] border border-black  "
                type="date"
                id="number"
                placeholder="Please Enter The Date Here"
              />
            </div>
          </CardContent>
          <div className="flex justify-between mx-20">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                name="terms"
                id="terms"
                className="size-4"
              />
              <Label className="text-[24px] " htmlFor="terms">
                I agree to the terms and conditions
              </Label>
            </div>
            <Button className="bg-green-400 text-white w-[155px] h-[40px] hover:bg-white hover:text-green-400 border border-green-400">
              Book Now
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Bookform;
