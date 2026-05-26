import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import Rented from "./Rented";
import Edit from "./Edit";

const Profile = () => {
  return (
    <>
      <section className=" mt-5 mx-[30px]">
        <Tabs defaultValue="info" className="flex !flex-row rounded-none">
          <div >
            <TabsList className="flex flex-col gap-2 !h-[550px]  justify-start rounded-none bg-white">
              <TabsTrigger
                value="info"
                className="w-[360px]  p-3 flex-0 justify-start rounded-none data-[state=active]:bg-[#DEDCDC]"
              >
                User Profile
              </TabsTrigger>

              <TabsTrigger
                value="rented"
                className="w-[360px] p-3 flex-0 rounded-none justify-start data-[state=active]:bg-[#DEDCDC]"
              >
                Rented Cars
              </TabsTrigger>

              <TabsTrigger
                value="edit"
                className="w-[360px] p-3 flex-0 rounded-none justify-start data-[state=active]:bg-[#DEDCDC]"
              >
                Edit Profile
              </TabsTrigger>

              <TabsTrigger
                value=""
                className="w-[360px] p-3 flex-0 rounded-none justify-start data-[state=active]:bg-[#DEDCDC]"
              >
                Delete Account
              </TabsTrigger>
            </TabsList>
          </div>

          <div className=" flex-1">
            <TabsContent value="info" className="mx-10">
              <p className="p-3 text-[20px]">User Profile</p>
              <div className="flex gap-9 mt-5 p-3 items-center border border-[#DEDCDC] rounded-2xl">
                <Image
                  src="/test1.jpg"
                  width={130}
                  height={130}
                  alt="user Profile"
                  className="rounded-full"
                />
                <div className="flex justify-between w-full">
                  <div className="text-[24px] ml-5">
                    <p>Name : Test</p>
                    <p>Role</p>
                  </div>

                  <Button className="bg-transparent text-black border border-[#DEDCDC] px-[34px] py-[10px]">
                    Edit Profile
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 21h14c1.1 0 2-.9 2-2v-7h-2v7H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"
                      />
                      <path
                        fill="currentColor"
                        d="M7 13v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l9-9a.996.996 0 0 0 0-1.41l-3-3a.996.996 0 0 0-1.41 0l-9.01 8.99A1 1 0 0 0 7 13m10-7.59L18.59 7L17.5 8.09L15.91 6.5zm-8 8l5.5-5.5l1.59 1.59l-5.5 5.5H9z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="text-[20px] px-4 border border-[#DEDCDC] mt-3 rounded-2xl">
                <p className="text-2xl p-3">Personal Information</p>

                <dl className="mt-2">
                  <dt className="text-[#989898]">Email</dt>
                  <dd className="font-semibold">test@example.com</dd>
                </dl>

                <dl className="mt-2">
                  <dt className="text-[#989898]">Phone Numbser</dt>
                  <dd className="font-semibold">9800000000</dd>
                </dl>

                <dl className="mt-2">
                  <dt className="text-[#989898]">License number</dt>
                  <dd className="font-semibold">01-02-02-02-02</dd>
                </dl>
              </div>

              <div className="text-[20px] px-4 border border-[#DEDCDC] mt-3 rounded-2xl">
                <p className="text-2xl p-3">Address</p>

                <dl className="mt-2">
                  <dt className="text-[#989898]">Country</dt>
                  <dd className="font-semibold">Nepal</dd>
                </dl>

                <dl className="mt-2">
                  <dt className="text-[#989898]">City</dt>
                  <dd className="font-semibold">Chapagaun</dd>
                </dl>
              </div>
            </TabsContent>

            <TabsContent value="rented">
              <p className="text-2xl">Vehicle You Have Rented</p>
              <Rented />
            </TabsContent>

            <TabsContent value="edit" className="grid justify-center">
              <p className="text-2xl">Edit</p>
              <Edit />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </>
  );
};

export default Profile;
