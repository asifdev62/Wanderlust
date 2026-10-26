import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import {
  formatDestinationDuration,
  getDestinationHighlights,
  getDestinationRating,
  getDestinationReviewCount,
  type Destination,
} from "@/lib/destinations";

import { BookingPanel } from "./booking-panel";
import { DeleteDestinationDialog } from "../delete-destination-dialog";
import { EditDestinationDialog } from "../edit-destination-dialog";

export function DestinationDetails({
  destination,
}: {
  destination: Destination;
}) {
  const rating = getDestinationRating(destination._id);
  const reviewCount = getDestinationReviewCount(destination._id);
  const highlights = getDestinationHighlights(destination.description);

  return (
    <div className="mx-auto w-full max-w-300 px-5 pt-9 pb-20 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destinations"
          className="group inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-brand"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={1.8}
          />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2.5">
          <EditDestinationDialog destination={destination} />

          <DeleteDestinationDialog id={destination._id} />
        </div>
      </div>

      <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-neutral-100 sm:aspect-[12/5] lg:mt-8">
        <Image
          src={destination.imageUrl}
          alt={`${destination.destinationName}, ${destination.country}`}
          fill
          priority
          sizes="(min-width: 1000px) 1100px, 100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mt-7 grid gap-8 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_336px]">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <MapPin
              aria-hidden="true"
              className="size-3.5 text-neutral-400"
              strokeWidth={1.8}
            />
            {destination.country}
          </p>

          <h1 className="mt-1 text-[32px] leading-tight font-light tracking-[-0.01em] text-neutral-900 sm:text-[36px] lg:text-[40px]">
            {destination.destinationName}
          </h1>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <p className="inline-flex items-center gap-1.5 text-[11px] text-neutral-600">
              <Star
                aria-hidden="true"
                className="size-3.5 fill-emerald-500 text-emerald-500"
                strokeWidth={0}
              />
              <span className="font-semibold text-neutral-800">{rating}</span>
              <span className="text-neutral-400">({reviewCount} reviews)</span>
            </p>

            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-neutral-200 sm:block"
            />

            <p className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
              <CalendarDays
                aria-hidden="true"
                className="size-3.5 text-neutral-400"
                strokeWidth={1.7}
              />
              {formatDestinationDuration(destination.duration)}
            </p>
          </div>

          <section aria-labelledby="overview-heading" className="mt-7">
            <h2
              id="overview-heading"
              className="text-xl font-normal tracking-[-0.01em] text-neutral-900 lg:text-[22px]"
            >
              Overview
            </h2>
            <p className="mt-2 max-w-[72ch] text-[13px] leading-6 text-neutral-500 sm:text-sm">
              {destination.description}
            </p>
          </section>

          {highlights.length > 0 ? (
            <section aria-labelledby="highlights-heading" className="mt-8">
              <h2
                id="highlights-heading"
                className="text-xl font-normal tracking-[-0.01em] text-neutral-900 lg:text-[22px]"
              >
                Highlights
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-500 sm:text-sm">
                A few of the experiences waiting for you on this trip.
              </p>

              <ul
                role="list"
                className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2"
              >
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-[12px] leading-relaxed text-neutral-600 sm:text-[13px]"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-3.5 shrink-0 text-emerald-600"
                      strokeWidth={2.2}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <BookingPanel destination={destination} />
      </div>
    </div>
  );
}
