import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header className="h-[62px] bg-[#F9F4F4] w-full">
        <nav className=" flex items-center justify-between mx-30">
          <Link href="/Home">
            <Image
              src="/logo.png"
              alt="Carorent logo"
              width={90}
              height={62}
              style={{ height: "auto" }}
              className="mix-blend-darken"
            />
          </Link>

          <div className="w-[420px] rounded-2xl border-black border flex items-center">
            <input
              type="text"
              className="focus:outline-none w-[100%] px-3"
              placeholder="Search the car you wnat to find"
            />
            <Button className="bg-transparent text-black ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                />
              </svg>
            </Button>
          </div>

          <div className="flex gap-5 items-center">
            <div>
              <ul className="flex gap-5 text-[black]">
                <li>
                  <Link href="/Home">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div>
              <Button className="bg-[#10C979] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                    clipRule="evenodd"
                  />
                </svg>
                Login
              </Button>

              <Button className="bg-transparent text-black border border-black rounded-full p-3">
                <Link href="/Profile/1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth={2}>
                      <path
                        stroke-linejoin="round"
                        d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                      />
                      <circle cx="12" cy="7" r="3" />
                    </g>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
