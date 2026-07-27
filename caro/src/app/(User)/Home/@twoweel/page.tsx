"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { poppins } from "@/lib/fonts";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Vehicle {
  _id: string;
  Path: string;
  VehiclesName: string;
  VehiclesModel: string;
  VehiclesWheel: string;
  VehiclesTopspeed: string;
  VehiclesAcceleration: string;
  VehiclesEngine: string;
  VehiclesPrice: string;
}

const cardStyle = {
  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
};

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const imageUrl = vehicle.Path
    ? `http://localhost:8000${vehicle.Path}`
    : "/test2.jpg";

  return (
    <Link
      href={`/Order/${vehicle._id}`}
      className="h-[420px] w-[320px] shrink-0 md:w-[320px] rounded-[16px] hover:scale-[1.02] transition-transform duration-300 bg-white block"
      style={cardStyle}
    >
      <img
        src={imageUrl}
        alt={vehicle.VehiclesName}
        width={320}
        height={240}
        className="h-[240px] w-full rounded-t-[16px] object-cover"
      />

      <div className="flex justify-between p-5">
        <div className="text-[16px]">
          <h1 className="text-[20px]">{vehicle.VehiclesName}</h1>
          <p className="mt-[-6px] text-[16px]">{vehicle.VehiclesModel}</p>
        </div>

        <div>
          <p className="text-[20px]">${vehicle.VehiclesPrice}/day</p>
        </div>
      </div>

      <div className="flex justify-between px-5">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 16.088q.95-.013 1.4-.688L19 7l-8.4 5.6q-.675.45-.712 1.375t.562 1.525t1.55.588M12 4q1.475 0 2.838.413T17.4 5.65l-1.9 1.2q-.825-.425-1.712-.637T12 6Q8.675 6 6.337 8.338T4 14q0 1.05.288 2.075T5.1 18h13.8q.575-.95.838-1.975T20 13.9q0-.9-.213-1.75t-.637-1.65l1.2-1.9q.75 1.175 1.188 2.5T22 13.85t-.325 2.725t-1.025 2.475q-.275.45-.75.7t-1 .25H5.1q-.525 0-1-.25t-.75-.7q-.65-1.125-1-2.387T2 14q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 4m.175 7.825"
            />
          </svg>
          <span>{vehicle.VehiclesTopspeed}</span>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 2h3c.28 0 .53.11.71.29l2.08 2.09l.8-.79C10 3.2 10.5 3 11 3h6c.5 0 1 .2 1.41.59l1 1C19.8 5 20 5.5 20 6v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8c0-.5.2-1 .59-1.41l.79-.8L5.59 4H3zm8 3v2h6V5zm.41 6l-2-2H8v1.41l2 2v3.18l-2 2V19h1.41l2-2h3.18l2 2H18v-1.41l-2-2v-3.18l2-2V9h-1.41l-2 2zm.59 2h2v2h-2z"
            />
          </svg>
          <span>{vehicle.VehiclesEngine}</span>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="currentColor"
                d="M3.468 16.745c.495-.958 1.54-1.6 2.804-1.441a34 34 0 0 1 3.97.726c2.01.502 3.771 1.467 5.073 2.348l.44.306l.4.295l.358.276l.314.254l.267.226l.22.192c.843.751.27 1.978-.685 2.068l-.112.005H7.923c-1.682 0-3.08-.845-4.104-2.126c-.774-.967-.84-2.183-.35-3.129ZM19 2c.893 0 1.278.84 1.467 1.61l.06.268l.024.128c.144.797.221 1.842.252 2.916c.06 2.125-.062 4.602-.327 5.795c-.462 2.082-1.14 3.529-1.952 4.401c-.826.89-1.942 1.291-2.971.776c-.789-.394-1.26-1.331-1.518-2.13a5.73 5.73 0 0 1 .017-3.58c.21-.632.588-1.142 1.004-1.627l.363-.411c.442-.495.885-.99 1.187-1.593c.44-.88.56-1.843.597-2.81l.014-.58l.009-.56l.006-.138l.02-.28C17.347 3.107 17.716 2 19 2"
              />
            </g>
          </svg>
          <span>{vehicle.VehiclesAcceleration}</span>
        </div>
      </div>
    </Link>
  );
}

function VehicleList({
  vehicles,
  emptyMessage,
}: {
  vehicles: Vehicle[];
  emptyMessage: string;
}) {
  if (vehicles.length === 0) {
    return <p className="p-5 text-gray-600">{emptyMessage}</p>;
  }

  return (
    <>
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle._id} vehicle={vehicle} />
      ))}
    </>
  );
}

const Twoweel = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/vehicles/fetchvehicle",
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load vehicles");
        }

        const twoWheelers = (data.vehicles || []).filter(
          (vehicle: Vehicle) => vehicle.VehiclesWheel === "2",
        );

        setVehicles(twoWheelers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const sportVehicles = useMemo(
    () =>
      vehicles.filter(
        (vehicle) => !vehicle.VehiclesModel.toLowerCase().includes("classic"),
      ),
    [vehicles],
  );

  const classicVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) =>
        vehicle.VehiclesModel.toLowerCase().includes("classic"),
      ),
    [vehicles],
  );

  return (
    <>
      <section className={`h-[595px] md:mx-30 mt-5 ${poppins.className}`}>
        <h2 className="text-3xl p-2 ml-10">Our Two Wheeler collections</h2>

        {loading ? (
          <p className="p-5 text-gray-600">Loading two wheelers...</p>
        ) : error ? (
          <p className="p-5 text-red-600">{error}</p>
        ) : (
          <Tabs defaultValue="sport">
            <TabsList className="gap-5 ml-5 mt-5 bg-white">
              <TabsTrigger value="sport" className="bg-transparent">
                Sport
              </TabsTrigger>
              <TabsTrigger value="clasic">clasic</TabsTrigger>
            </TabsList>

            <TabsContent
              value="sport"
              className="flex w-full overflow-x-auto gap-5 p-5"
            >
              <VehicleList
                vehicles={sportVehicles}
                emptyMessage="No sport two wheelers available."
              />
            </TabsContent>

            <TabsContent
              value="clasic"
              className="flex w-full overflow-x-auto gap-5 p-5"
            >
              <VehicleList
                vehicles={classicVehicles}
                emptyMessage="No classic two wheelers available."
              />
            </TabsContent>
          </Tabs>
        )}

        <p className="text-green-400 flex float-end">
          <Link
            href="/Morev?wheel=2"
            className="opacity-0 md:opacity-100 flex gap-1"
          >
            check more collection
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="m14.707 5.636l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l3.95-3.95H4a1 1 0 1 1 0-2h13.243l-3.95-3.95a1 1 0 1 1 1.414-1.414"
                />
              </g>
            </svg>
          </Link>
        </p>
      </section>
    </>
  );
};

export default Twoweel;
