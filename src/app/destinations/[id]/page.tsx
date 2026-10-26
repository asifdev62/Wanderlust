import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { CloudOff } from "lucide-react";
import Link from "next/link";

import type { Destination } from "@/lib/destinations";

import { DestinationDetails } from "./destination-details";

const DESTINATIONS_API = "http://localhost:5000/destination";

type DestinationDetailsPageProps = {
  params: Promise<{ id: string }>;
};

type DestinationPayload = Destination | { result?: Destination | null };

function isDestination(value: unknown): value is Destination {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    "destinationName" in value
  );
}

const getDestination = cache(
  async (id: string): Promise<Destination | null> => {
    const response = await fetch(
      `${DESTINATIONS_API}/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Could not load destination (${response.status}).`);
    }

    const payload = (await response.json()) as DestinationPayload | null;

    if (!payload || typeof payload !== "object") {
      return null;
    }

    if (isDestination(payload)) {
      return payload;
    }

    if ("result" in payload) {
      return isDestination(payload.result) ? payload.result : null;
    }

    return null;
  }
);

export async function generateMetadata({
  params,
}: DestinationDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const destination = await getDestination(id);

    if (!destination) {
      return { title: "Destination Not Found — Wonderlast" };
    }

    return {
      title: `${destination.destinationName}, ${destination.country} — Wonderlast`,
      description: destination.description,
    };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Destination Details — Wonderlast" };
  }
}

function DestinationUnavailable() {
  return (
    <div className="flex flex-col items-center border border-dashed border-neutral-200 bg-neutral-50/60 px-6 py-16 text-center">
      <CloudOff
        aria-hidden="true"
        className="size-8 text-neutral-300"
        strokeWidth={1.4}
      />
      <h1 className="mt-4 text-lg font-normal text-neutral-900">
        We couldn&apos;t load this destination
      </h1>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-neutral-500">
        The destination service is unavailable right now. Please try again in a
        moment.
      </p>
      <Link
        href="/destinations"
        className="mt-6 bg-brand px-5 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand-dark"
      >
        Back to destinations
      </Link>
    </div>
  );
}

export default async function DestinationDetailsPage({
  params,
}: DestinationDetailsPageProps) {
  const { id } = await params;

  let destination: Destination | null;

  try {
    destination = await getDestination(id);
  } catch (error) {
    unstable_rethrow(error);
    console.error("Could not load destination:", error);

    return (
      <main className="flex-1 bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-5 pt-9 pb-20 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
          <Link
            href="/destinations"
            className="text-xs text-neutral-500 transition-colors hover:text-brand"
          >
            ← Back to Destinations
          </Link>
          <div className="mt-6">
            <DestinationUnavailable />
          </div>
        </div>
      </main>
    );
  }

  if (!destination) {
    notFound();
  }

  return (
    <main className="flex-1 bg-white">
      <DestinationDetails destination={destination} />
    </main>
  );
}
