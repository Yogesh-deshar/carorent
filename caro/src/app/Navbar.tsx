"use client";

import { Button } from "@/components/ui/button";
import { AuthUser, getAuthSnapshot, subscribeToAuth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";

function parseAuthUser(snapshot: string | null): AuthUser | null {
  if (!snapshot) return null;

  try {
    return JSON.parse(snapshot) as AuthUser;
  } catch {
    return null;
  }
}

const Navbar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const userSnapshot = useSyncExternalStore(
    subscribeToAuth,
    getAuthSnapshot,
    () => null,
  );
  const user = useMemo(() => parseAuthUser(userSnapshot), [userSnapshot]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchValue.trim();

    if (query) {
      router.push(`/Search?q=${encodeURIComponent(query)}`);
    }
  };

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
              priority
              style={{ height: "auto" }}
              className="mix-blend-darken"
            />
          </Link>

          <form
            onSubmit={handleSearch}
            className="w-[420px] rounded-2xl border-black border flex items-center"
          >
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="focus:outline-none w-full px-3"
              placeholder="Search the car you want to find"
            />
            <Button type="submit" className="bg-transparent text-black">
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
          </form>

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
              {user ? (
                <Button
                  className="bg-transparent text-black border border-black rounded-full p-3"
                  asChild
                >
                  <Link href={`/Profile/${user._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" stroke="currentColor" strokeWidth={2}>
                        <path
                          strokeLinejoin="round"
                          d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                        />
                        <circle cx="12" cy="7" r="3" />
                      </g>
                    </svg>
                  </Link>
                </Button>
              ) : (
                <Button className="bg-[#10C979]" asChild>
                  <Link href="/Login">
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
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
