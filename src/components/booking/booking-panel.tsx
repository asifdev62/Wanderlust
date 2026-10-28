"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import {
  API_BASE_URL,
  formatDestinationPrice,
  formatDepartureDate,
  getApiErrorMessage,
  readJsonResponse,
  type Destination,
} from "@/lib/destinations";
import { getMyBookingsUrl } from "@/lib/bookings";
import { authClient } from "@/lib/auth-client";

const bookingPerks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function isAlreadyBooked(payload: unknown, destinationId: string) {
  if (!Array.isArray(payload)) {
    return false;
  }

  return payload.some((item) => {
    if (typeof item !== "object" || item === null) {
      return false;
    }

    const record = item as Record<string, unknown>;
    const id = record._id ?? record.destinationId;

    return id !== undefined && String(id) === destinationId;
  });
}

export function BookingPanel({ destination }: { destination: Destination }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isBooking, setIsBooking] = useState(false);

  async function handleBookingDestination(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isBooking) {
      return;
    }

    if (!user?.email) {
      toast.error("Please sign in to book this destination.");
      return;
    }

    const data = {
      username: user.name,
      email: user.email,
      ...destination,
      departureDate: destination.departureDate,
      bookingDate: new Date(),
    };

    setIsBooking(true);

    try {
      const bookingsRes = await fetch(getMyBookingsUrl(user.email), {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });

      if (!bookingsRes.ok) {
        throw new Error(
          `Could not check your existing bookings (${bookingsRes.status}).`
        );
      }

      if (isAlreadyBooked(await readJsonResponse(bookingsRes), destination._id)) {
        toast.error("You have already booked this destination.", {
          description: "Open My Bookings to view or cancel it.",
        });
        return;
      }

      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });

      // Check the status before reading the body so the toast is not delayed
      // by (or broken by) a non-JSON response.
      if (!res.ok) {
        throw new Error(
          getApiErrorMessage(
            await readJsonResponse(res),
            `Could not complete your booking (${res.status}).`
          )
        );
      }

      toast.success("Booking successful!", {
        description: `${destination.destinationName} has been added to your bookings.`,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not complete your booking. Please try again."
      );
    } finally {
      setIsBooking(false);
    }
  }

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

      <form onSubmit={handleBookingDestination}>
        <p className="mt-5 flex h-9 items-center border border-neutral-200 bg-neutral-50 px-3 text-[11px] text-neutral-600">
          <span className="sr-only">Departure date: </span>
          <time dateTime={destination.departureDate}>
            {formatDepartureDate(destination.departureDate)}
          </time>
        </p>

        <button
          type="submit"
          disabled={isBooking}
          aria-busy={isBooking}
          className="mt-3 flex h-9 w-full items-center justify-center gap-3 bg-brand text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand"
        >
          {isBooking ? (
            <>
              Booking...
              <LoaderCircle
                aria-hidden="true"
                className="size-3.5 animate-spin"
                strokeWidth={1.9}
              />
            </>
          ) : (
            <>
              Book Now
              <ArrowRight
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.9}
              />
            </>
          )}
        </button>
      </form>

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
