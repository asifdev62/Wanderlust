import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import {
  formatDestinationDuration,
  formatDestinationPrice,
  getDestinationRating,
  type Destination,
} from "@/lib/destinations";

type DestinationCardProps = {
  destination: Destination;
  priority?: boolean;
};

export function DestinationCard({
  destination,
  priority = false,
}: DestinationCardProps) {
  const href = `/destinations/${destination._id}`;
  const rating = getDestinationRating(destination._id);

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={href}
        aria-label={`View ${destination.destinationName}`}
        className="relative block aspect-[8/5] overflow-hidden bg-neutral-100"
      >
        <Image
          src={destination.imageUrl}
          alt={`${destination.destinationName}, ${destination.country}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 bg-white/90 px-2 py-1 text-[11px] font-medium text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-sm">
          <Star
            aria-hidden="true"
            className="size-3 fill-neutral-800 text-neutral-800"
            strokeWidth={0}
          />
          {rating}
          <span className="sr-only">out of 5</span>
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="flex items-center gap-1.5 text-[11px] text-neutral-500">
          <MapPin
            aria-hidden="true"
            className="size-3.5 text-neutral-400"
            strokeWidth={1.8}
          />
          {destination.country}
        </p>

        <h2 className="mt-1 text-[17px] leading-snug font-normal text-neutral-900 transition-colors group-hover:text-brand">
          <Link href={href}>{destination.destinationName}</Link>
        </h2>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="text-[15px] font-semibold text-neutral-900">
            {formatDestinationPrice(destination.price)}
            <span className="ml-1 text-[10px] font-normal text-neutral-400">
              /Person
            </span>
          </p>

          <p className="flex items-center gap-1 text-[10px] text-neutral-500">
            <CalendarDays
              aria-hidden="true"
              className="size-3.5 text-neutral-400"
              strokeWidth={1.7}
            />
            {formatDestinationDuration(destination.duration)}
          </p>
        </div>

        <Link
          href={href}
          className="mt-3.5 inline-flex w-fit items-center gap-1.5 border-b border-transparent pb-0.5 text-[10px] font-semibold tracking-[0.14em] text-brand uppercase transition-colors hover:border-brand hover:text-brand-dark"
        >
          Book Now
          <ArrowUpRight
            aria-hidden="true"
            className="size-3"
            strokeWidth={2}
          />
        </Link>
      </div>
    </article>
  );
}
