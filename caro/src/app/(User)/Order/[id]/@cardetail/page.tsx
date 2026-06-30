"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Vehicle {
  _id: string;
  Path: string;
  VehiclesName: string;
  VehiclesModel: string;
  VehiclesYear: string;
  VehiclesType: string;
  VehiclesWheel: string;
  VehiclesEngine: string;
  VehiclesAcceleration: string;
  VehiclesTopspeed: string;
  VehiclesSeat: string;
  VehiclesColor: string;
  VehiclesPrice: string;
  VehiclesDetails: string;
}

const Cardetail = () => {
  const params = useParams();
  const id = params.id as string;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/vehicles/fetchvehicle/${id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load vehicle");
        }

        setVehicle(data.vehicle);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="md:mx-30 mt-5 p-6 text-xl text-gray-600">
        Loading vehicle...
      </section>
    );
  }

  if (error || !vehicle) {
    return (
      <section className="md:mx-30 mt-5 p-6 text-xl text-red-600">
        {error || "Vehicle not found"}
      </section>
    );
  }

  const imageUrl = vehicle.Path
    ? `http://localhost:8000${vehicle.Path}`
    : "/test1.jpg";

  return (
    <>
      <section className="flex gap-2 md:mx-30 mt-5">
        <main className="md:w-1/2 w-full">
          <h2 className="text-[64px]">{vehicle.VehiclesName}</h2>
          <div className="flex justify-between text-[36px] mt-[-25px] md:w-[565px]">
            <p>{vehicle.VehiclesModel}</p>
            <p>${vehicle.VehiclesPrice}/day</p>
          </div>

          <Card className="w-[565px] mt-4">
            <CardHeader>
              <h2 className="text-[32px] text-center">Vehicles Specs</h2>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible className=" px-3 py-2 ">
                <AccordionItem value="Cardetail">
                  <AccordionTrigger className="text-[16px] font-bold items-center">
                    Vehicles Detail
                  </AccordionTrigger>

                  <AccordionContent>
                    <dl>
                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">Vehicles type</dt>
                        <dd className="font-medium text-foreground">
                          {vehicle.VehiclesType}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">Vehicles Year</dt>
                        <dd className="font-medium text-foreground">
                          {vehicle.VehiclesYear}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">Wheeler</dt>
                        <dd className="font-medium text-foreground">
                          {vehicle.VehiclesWheel} Wheeler
                        </dd>
                      </div>
                    </dl>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="engine ">
                  <AccordionTrigger className="text-[16px] font-bold items-center">
                    Engine
                  </AccordionTrigger>

                  <AccordionContent>
                    <dl>
                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">Engine Type</dt>
                        <dd className="font-medium text-foreground">
                          {vehicle.VehiclesEngine}
                        </dd>
                      </div>

                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">Acceleration</dt>
                        <dd className="font-medium text-foreground">
                          {vehicle.VehiclesAcceleration}
                        </dd>
                      </div>

                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">Top Speed</dt>
                        <dd className="font-medium text-foreground">
                          {vehicle.VehiclesTopspeed}
                        </dd>
                      </div>
                    </dl>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="intandext">
                  <AccordionTrigger className="text-[16px] font-bold items-center">
                    Interior and Exterior
                  </AccordionTrigger>
                  <AccordionContent>
                    <dl>
                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">
                          Seating Capacity
                        </dt>
                        <dd className="font-medium text-foreground">
                          {vehicle.VehiclesSeat}
                        </dd>
                      </div>

                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <dt className="text-muted-foreground">
                          Exterior Color
                        </dt>
                        <dd className="font-medium text-foreground">
                          {vehicle.VehiclesColor}
                        </dd>
                      </div>
                    </dl>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="details">
                  <AccordionTrigger className="text-[16px] font-bold items-center">
                    Other Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <dl>
                      <div className="flex justify-between py-2.5 text-sm border-b border-border">
                        <p>{vehicle.VehiclesDetails}</p>
                      </div>
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </main>

        <aside className=" md:w-1/2 ">
          <img
            src={imageUrl}
            alt={vehicle.VehiclesName}
            width={600}
            height={500}
            className="h-[500px] w-full object-cover"
          />
        </aside>
      </section>
    </>
  );
};

export default Cardetail;
