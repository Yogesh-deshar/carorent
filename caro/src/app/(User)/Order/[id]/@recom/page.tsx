"use client";

import VehicleCard, { Vehicle } from "@/components/VehicleCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SimilarVehicle extends Vehicle {
  similarity?: number;
}

const Recom = () => {
  const params = useParams();
  const id = params.id as string;

  const [recommendations, setRecommendations] = useState<SimilarVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!id) return;

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:8000/api/vehicles/similar/${id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load recommendations");
        }

        setRecommendations(data.recommendations ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [id]);

  return (
    <section className="md:mx-30">
      <h2 className="text-[32px]">Other Recommended</h2>
      <p className="px-5 text-gray-600">
        Similar vehicles ranked by Jaccard similarity.
      </p>

      {loading && (
        <p className="p-5 text-gray-600">Loading recommendations...</p>
      )}

      {error && <p className="p-5 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex w-full overflow-x-auto gap-5 p-5">
          {recommendations.length === 0 ? (
            <p className="text-gray-600">No similar vehicles found.</p>
          ) : (
            recommendations.map((vehicle) => (
              <div key={vehicle._id} className="relative shrink-0">
                <VehicleCard vehicle={vehicle} />
                {vehicle.similarity !== undefined && (
                  <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {Math.round(vehicle.similarity * 100)}% match
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default Recom;
