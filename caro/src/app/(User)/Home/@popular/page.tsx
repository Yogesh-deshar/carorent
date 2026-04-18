import Image from "next/image";

const Popular = () => {
  return (
    <>
      <section className="mx-10 mt-8">
        <h2 className="ml-5 text-[32px]">Some of our popular cars</h2>
        <div className="flex w-full  gap-5 p-5 ">
          <div className="group relative h-[420px] w-[80vw] shrink-0 md:w-[450px] hover:scale-105 transition-transform duration-300">
            <Image
              src="/test1.jpg"
              alt="Suv"
              fill={true}
              className="rounded-[16px]"
            />

            <div className="group-hover:opacity-100 opacity-0 absolute bottom-13 text-[16px] left-5 z-10 transition-opacity duration-300 ease-in-out">
              <h1>Car Name</h1>
              <p>Automation / Manual</p>
            </div>

            <div className="group-hover:opacity-100 opacity-0 absolute bottom-13 text-[16px] right-5 z-10 transition-opacity duration-300 ease-in-out">
              <h1>Start at</h1>
              <p>$100/day</p>
            </div>
          </div>

          <div className="group hover:scale-x-50-1.5 relative h-[420px] w-[80vw] shrink-0 md:w-[450px] hover:scale-105 transition-transform duration-300">
            <Image
              src="/test1.jpg"
              alt="Suv"
              fill={true}
              className="rounded-[16px]"
            />
            <div className="group-hover:opacity-100 opacity-0 absolute bottom-13 text-[16px] left-5 z-10 transition-opacity duration-300 ease-in-out">
              <h1>Car Name</h1>
              <p>Automation / Manual</p>
            </div>

            <div className="group-hover:opacity-100 opacity-0 absolute bottom-13 text-[16px] right-5 z-10 transition-opacity duration-300 ease-in-out">
              <h1>Start at</h1>
              <p>$100/day</p>
            </div>
          </div>

          <div className="group relative h-[420px] w-[80vw] shrink-0 md:w-[450px] hover:scale-105 transition-transform duration-300 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/test1.jpg"
              alt="Suv"
              fill={true}
              className="rounded-[16px]"
            />
            <div className="group-hover:opacity-100 opacity-0 absolute bottom-13 text-[16px] left-5 z-10 transition-opacity duration-300 ease-in-out">
              <h1>Car Name</h1>
              <p>Automation / Manual</p>
            </div>

            <div className="group-hover:opacity-100 opacity-0 absolute bottom-13 text-[16px] right-5 z-10 transition-opacity duration-300 ease-in-out">
              <h1>Start at</h1>
              <p>$100/day</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Popular;
