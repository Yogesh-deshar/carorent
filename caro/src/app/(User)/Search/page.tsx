import { Suspense } from "react";
import SearchPage from "./SearchContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <section className="md:mx-30 p-5 text-gray-600">Loading search...</section>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
