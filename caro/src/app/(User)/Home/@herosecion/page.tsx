import React from "react";
import Image from "next/image";
const Herosetion = () => {
  return (
    <>
      <section>
        <div className="w-[100dvw] h-[633px] relative">
          <Image src="/herosection.jpg" alt="Hero Section" fill={true} />
          <h2 className="absolute top-15 left-5 text-[48px]">
            Find the car <br /> you want to drive
          </h2>
        </div>
      </section>
    </>
  );
};

export default Herosetion;
