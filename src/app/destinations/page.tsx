import type { Metadata } from "next";
import { unstable_rethrow } from "next/navigation";
import { Suspense } from "react";
import { CloudOff } from "lucide-react";

import type { Destination } from "@/lib/destinations";

import { DestinationsExplorer } from "./destinations-explorer";
import { DestinationsExplorerSkeleton } from "./destinations-explorer-skeleton";
import { RetryButton } from "@/components/retry-button";

export const metadata: Metadata = {
  title: "Explore All Destinations — Wonderlast",
  description:
    "Browse our curated collection of travel destinations and find your perfect next adventure.",
};

const DESTINATIONS_API = "http://localhost:5000/destination";

async function getDestinations(): Promise<Destination[]> {
  const response = await fetch(DESTINATIONS_API, {
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Could not load destinations (${response.status}).`);
  }

  return response.json();
}

function DestinationsUnavailable() {
  return (
    <div className="mt-7 flex flex-col items-center border border-dashed border-neutral-200 bg-neutral-50/60 px-6 py-16 text-center lg:mt-9">
      <CloudOff
        aria-hidden="true"
        className="size-8 text-neutral-300"
        strokeWidth={1.4}
      />
      <h2 className="mt-4 text-lg font-normal text-neutral-900">
        We couldn&apos;t load the destinations
      </h2>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-neutral-500">
        The destination service is unavailable right now. Please try again in a
        moment.
      </p>
      <RetryButton className="mt-6">Try again</RetryButton>
    </div>
  );
}

async function DestinationsContent() {
  let destinations: Destination[];

  try {
    destinations = await getDestinations();
  } catch (error) {
    unstable_rethrow(error);
    console.error("Could not load destinations:", error);
    return <DestinationsUnavailable />;
  }

  return <DestinationsExplorer destinations={destinations} />;
}

export default function AllDestinationsPage() {
  return (
    <main className="flex-1 bg-white">
      <section
        aria-labelledby="destinations-heading"
        className="mx-auto w-full max-w-[1200px] px-5 pt-10 pb-20 sm:px-8 lg:px-10 lg:pt-14 lg:pb-24"
      >
        <header>
          <h1
            id="destinations-heading"
            className="text-[32px] leading-tight font-light tracking-[-0.02em] text-neutral-900 sm:text-[38px] lg:text-[44px]"
          >
            Explore All Destinations
          </h1>
          <p className="mt-1.5 text-[13px] text-neutral-500 sm:text-sm">
            Find your perfect travel experience from our curated collection.
          </p>
        </header>

        <Suspense fallback={<DestinationsExplorerSkeleton />}>
          <DestinationsContent />
        </Suspense>
      </section>
    </main>
  );
}
