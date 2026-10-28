import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  ImageOff,
  Ticket,
  XCircle,
} from "lucide-react";

import { CancelBookingButton } from "@/components/CancelBookingButton";
import type { Booking } from "@/lib/bookings";
import { formatDestinationPrice } from "@/lib/destinations";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  string,
  { label: string; className: string; Icon: typeof CheckCircle2 }
> = {
  confirmed: {
    label: "Confirmed",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    Icon: Clock3,
  },
  cancelled: {
    label: "Cancelled",
    className: "border-neutral-200 bg-neutral-100 text-neutral-600",
    Icon: XCircle,
  },
  canceled: {
    label: "Cancelled",
    className: "border-neutral-200 bg-neutral-100 text-neutral-600",
    Icon: XCircle,
  },
};

const fallbackStatus = {
  label: "Confirmed",
  className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Icon: CheckCircle2,
};

function formatBookingDate(value: string) {
  const [year, month, day] = value.split("T")[0].split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  // Built from parts so a date-only string isn't shifted by UTC parsing.
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BookingCard({
  booking,
  email,
}: {
  booking: Booking;
  email: string;
}) {
  const { _id, title, image, status, departureDate, price } = booking;
  const badge =
    statusStyles[status.toLowerCase().trim()] ?? fallbackStatus;

  return (
    <article className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:gap-5">
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-md bg-neutral-100 sm:h-28 sm:w-44">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 640px) 176px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-neutral-300">
            <ImageOff aria-hidden="true" className="size-6" strokeWidth={1.4} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase",
            badge.className
          )}
        >
          <badge.Icon aria-hidden="true" className="size-3" strokeWidth={2} />
          {badge.label}
        </span>

        <h3 className="mt-2 truncate text-lg font-semibold tracking-tight text-neutral-900">
          {title}
        </h3>

        <div className="mt-1.5 space-y-1 text-[11px] text-neutral-500 sm:text-xs">
          <p className="flex items-center gap-1.5">
            <CalendarDays
              aria-hidden="true"
              className="size-3 shrink-0"
              strokeWidth={1.8}
            />
            <span>Departure: {formatBookingDate(departureDate)}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Ticket
              aria-hidden="true"
              className="size-3 shrink-0"
              strokeWidth={1.8}
            />
            <span className="truncate" title={_id}>
              Booking ID: {_id}
            </span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 sm:mt-auto sm:pt-4">
          <span className="text-xl font-semibold text-brand">
            {formatDestinationPrice(price)}
          </span>

          <div className="flex items-start gap-2">
            <CancelBookingButton bookingId={_id} email={email} />
            <Link
              href={`/destinations/${_id}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Eye aria-hidden="true" className="size-3" strokeWidth={1.8} />
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
