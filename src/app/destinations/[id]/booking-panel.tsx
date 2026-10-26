import { ArrowRight, Check } from "lucide-react";

import {
  formatDestinationPrice,
  formatDepartureDate,
  type Destination,
} from "@/lib/destinations";

const bookingPerks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

export function BookingPanel({ destination }: { destination: Destination }) {
  return (
    <aside
      aria-label="Booking details"
      className="h-fit border border-neutral-200 bg-white p-5 sm:p-6"
    >
      <p className="text-[11px] text-neutral-500">Starting from</p>
      <p className="mt-1 text-[28px] leading-none font-normal text-brand">
        {formatDestinationPrice(destination.price)}
      </p>
      <p className="mt-1.5 text-[10px] text-neutral-400">per person</p>

      <p className="mt-5 flex h-9 items-center border border-neutral-200 bg-neutral-50 px-3 text-[11px] text-neutral-600">
        <span className="sr-only">Departure date: </span>
        <time dateTime={destination.departureDate}>
          {formatDepartureDate(destination.departureDate)}
        </time>
      </p>

      <button
        type="button"
        className="mt-3 flex h-9 w-full items-center justify-center gap-3 bg-brand text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Book Now
        <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.9} />
      </button>

      <ul
        role="list"
        className="mt-5 space-y-2.5 border-t border-neutral-100 pt-5"
      >
        {bookingPerks.map((perk) => (
          <li
            key={perk}
            className="flex items-start gap-2 text-[11px] leading-relaxed text-neutral-600"
          >
            <Check
              aria-hidden="true"
              className="mt-0.5 size-3.5 shrink-0 text-emerald-600"
              strokeWidth={2.2}
            />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
}
