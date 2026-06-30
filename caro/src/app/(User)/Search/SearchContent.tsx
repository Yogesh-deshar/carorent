"use client";

import VehicleCard, { Vehicle } from "@/components/VehicleCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [recommendations, setRecommendations] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setVehicles([]);
      setRecommendations([]);
      setError("");
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:8000/api/vehicles/search?q=${encodeURIComponent(query)}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Search failed");
        }

        setVehicles(data.vehicles ?? []);
        setRecommendations(data.recommendations ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        setVehicles([]);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <section className="md:mx-30">
      <h2 className="text-[32px]">Search Results</h2>

      {!query && (
        <p className="p-5 text-gray-600">
          Use the search bar above to find vehicles by name, model, type, or
          category.
        </p>
      )}

      {query && loading && (
        <p className="p-5 text-gray-600">Searching for &quot;{query}&quot;...</p>
      )}

      {query && error && <p className="p-5 text-red-500">{error}</p>}

      {query && !loading && !error && (
        <>
          <p className="px-5 text-gray-600">
            {vehicles.length} result{vehicles.length === 1 ? "" : "s"} for
            &quot;{query}&quot;
          </p>

          <div className="flex w-full justify-center flex-wrap gap-x-15 gap-y-5 p-5">
            {vehicles.length === 0 ? (
              <p className="text-gray-600">
                No vehicles matched your search. Check recommendations below.
              </p>
            ) : (
              vehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))
            )}
          </div>

          <h2 className="text-[32px] mt-8 px-5">Recommended For You</h2>
          <p className="px-5 text-gray-600 mb-2">
            Similar vehicles based on category, type, price, and your search.
          </p>

          <div className="flex w-full overflow-x-auto gap-5 p-5">
            {recommendations.length === 0 ? (
              <p className="text-gray-600">No recommendations available.</p>
            ) : (
              recommendations.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
}
