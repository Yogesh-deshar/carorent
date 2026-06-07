"use client";

import { useEffect, useMemo, useState } from "react";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
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
        setVehicles(data.vehicles || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const stats = useMemo(() => {
    const total = vehicles.length;
    const booked = vehicles.filter((v) => v.VehiclesBooked).length;
    const available = total - booked;
    return { total, booked, available };
  }, [vehicles]);

  return (
    <>
      <section className="mt-6 p-3 ">
        <div className="bg-white rounded-2xl w-full p-3">
          <h2 className="text-4xl">Dashboard</h2>
          <div className="w-[calc(100%-80px)] flex items-center flex-wrap gap-4">
            <div
              className="w-[500px] h-[200px] bg-white rounded-2xl gap-5 m-3 flex flex-col items-center justify-center"
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <span className="text-8xl">{stats.total}</span>
              <p className="text-6xl">Vehicles</p>
            </div>

            <div
              className="w-[400px] h-[200px] bg-white rounded-2xl flex flex-col items-center justify-center text-4xl"
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <span>{stats.booked}</span>
              <p>Booked</p>
            </div>

            <div className="grid gap-3 p-2 h-[200px]">
              <div
                className="col-span-1 row-span-2 w-[300px] bg-white rounded-2xl flex items-center justify-center gap-3 text-3xl"
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <span>{stats.available}</span>
                <p>Available</p>
              </div>
              <div
                className="col-span-1 row-span-1 bg-white rounded-2xl flex items-center justify-center gap-3 text-3xl"
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <span>$0</span>
                <p>Revenue</p>
              </div>
            </div>
          </div>
        </div>
        <main className="mt-6 bg-white rounded-2xl p-3 overflow-x-auto">
          {loading ? (
            <div className="p-6 text-xl text-gray-600">Loading vehicles...</div>
          ) : error ? (
            <div className="p-6 text-xl text-red-600">{error}</div>
          ) : (
            <table
              className="text-start w-full"
              style={{
                tableLayout: "fixed",
                borderSpacing: "0 8px",
                borderCollapse: "separate",
              }}
            >
              <thead className="border-b-2">
                <tr className="text-left text-[20px]">
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Image
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Car Name
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Model
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Type
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Wheel
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Price
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Available
                  </th>
                </tr>
              </thead>

              <tbody>
                {vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-600">
                      No vehicles found.
                    </td>
                  </tr>
                ) : (
                  vehicles.map((vehicle) => (
                    <tr key={vehicle._id} className="mt-2">
                      <td className="w-1/7 py-3">
                        <img
                          src={
                            vehicle.Path
                              ? `http://localhost:8000${vehicle.Path}`
                              : "/placeholder.png"
                          }
                          alt={vehicle.VehiclesName}
                          className=" w-20 aspect-square object-cover rounded-lg"
                        />
                      </td>
                      <td className="w-1/7 py-3">{vehicle.VehiclesName}</td>
                      <td className="w-1/7 py-3">{vehicle.VehiclesModel}</td>
                      <td className="w-1/7 py-3">{vehicle.VehiclesType}</td>
                      <td className="w-1/7 py-3">{vehicle.VehiclesWheel}</td>
                      <td className="w-1/7 py-3">{vehicle.VehiclesPrice}</td>
                      <td className="w-1/7 py-3">
                        {vehicle.VehiclesBooked ? "No" : "Yes"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </main>
      </section>
    </>
  );
};

export default Dashboard;
