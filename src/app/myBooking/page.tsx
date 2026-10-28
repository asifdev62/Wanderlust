import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { CloudOff } from "lucide-react";

import BookingCard from "@/components/BookingCard";
import { RetryButton } from "@/components/booking/retry-button";
import { auth } from "@/lib/auth";
import {
    getMyBookingsUrl,
    normalizeBooking,
    type Booking,
} from "@/lib/bookings";

export const metadata: Metadata = {
    title: "My Bookings — Wanderlast",
    description: "Manage and view your upcoming travel plans.",
};

async function getBookings(email: string): Promise<Booking[]> {
    const response = await fetch(getMyBookingsUrl(email), {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
        throw new Error(`Could not load bookings (${response.status}).`);
    }

    const payload: unknown = await response.json();

    const records = Array.isArray(payload)
        ? payload
        : typeof payload === "object" &&
            payload !== null &&
            "bookings" in payload &&
            Array.isArray(payload.bookings)
            ? payload.bookings
            : [];

    return records
        .map(normalizeBooking)
        .filter((booking): booking is Booking => booking !== null);
}

function SignInPrompt() {
    return (
        <div className="border-t border-neutral-200 pt-8">
            <p className="text-sm text-neutral-600">
                Sign in to see the trips you have booked.
            </p>
            <Link
                href="/login"
                className="mt-4 inline-flex bg-brand px-5 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand-dark"
            >
                Sign in
            </Link>
        </div>
    );
}

function BookingsUnavailable() {
    return (
        <div className="flex flex-col items-center border border-dashed border-neutral-200 bg-neutral-50/60 px-6 py-16 text-center">
            <CloudOff
                aria-hidden="true"
                className="size-8 text-neutral-300"
                strokeWidth={1.4}
            />
            <h2 className="mt-4 text-lg font-normal text-neutral-900">
                We couldn&apos;t load your bookings
            </h2>
            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-neutral-500">
                The booking service is unavailable right now. Please try again in a
                moment.
            </p>
            <RetryButton className="mt-6">Try again</RetryButton>
        </div>
    );
}

export default async function MyBookingPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const email = session?.user?.email;

    let bookings: Booking[] = [];
    let failed = false;

    if (email) {
        try {
            bookings = await getBookings(email);
        } catch (error) {
            console.error("Could not load bookings:", error);
            failed = true;
        }
    }

    let content: ReactNode;

    if (!email) {
        content = <SignInPrompt />;
    } else if (failed) {
        content = <BookingsUnavailable />;
    } else if (bookings.length === 0) {
        content = (
            <p className="border-t border-neutral-200 pt-6 text-sm text-neutral-500">
                You have no bookings yet.
            </p>
        );
    } else {
        content = (
            <ul
                role="list"
                className="divide-y divide-neutral-200 border-y border-neutral-200"
            >
                {bookings.map((booking, index) => (
                    <li key={`${booking._id}-${index}`}>
                        <BookingCard booking={booking} email={email} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <main className="flex-1 bg-white border">
            <div className="mx-auto w-full max-w-5xl px-5 pt-10 pb-20 sm:px-8 lg:pt-14 lg:pb-24">
                <header className="mb-7 sm:mb-8">
                    <h1 className="text-[30px] leading-tight font-normal tracking-[-0.02em] text-neutral-900 sm:text-[36px]">
                        My Bookings
                    </h1>
                    <p className="mt-1.5 text-[13px] text-neutral-500 sm:text-sm">
                        Manage and view your upcoming travel plans
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        You have {bookings.length} {bookings.length === 1 ? "destination" : "destinations"} booked
                    </p>
                </header>

                {content}
            </div>
        </main>
    );
}
