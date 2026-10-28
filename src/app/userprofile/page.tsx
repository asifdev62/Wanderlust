import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Camera,
  CircleDollarSign,
  Globe,
  MapPin,
  TicketCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { auth } from "@/lib/auth";
import { getBookingStats, type BookingStats } from "@/lib/bookings";
import { formatDestinationPrice } from "@/lib/destinations";
import { normalizeImageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Profile — Wanderlast",
  description: "Manage your Wanderlast account details and travel preferences.",
};

function formatMemberSince(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

type StatCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: string;
};

function buildStatCards(stats: BookingStats | null): StatCard[] {
  return [
    {
      label: "Total Bookings",
      value: stats ? String(stats.totalBookings) : "—",
      icon: TicketCheck,
      tone: "bg-[#e8f7fb] text-brand",
    },
    {
      label: "Countries Visited",
      value: stats ? String(stats.countriesVisited) : "—",
      icon: Globe,
      tone: "bg-emerald-50 text-emerald-500",
    },
    {
      label: "Upcoming Trips",
      value: stats ? String(stats.upcomingTrips) : "—",
      icon: TrendingUp,
      tone: "bg-orange-50 text-orange-500",
    },
    {
      label: "Total Spent",
      value: stats ? formatDestinationPrice(stats.totalSpent) : "—",
      icon: CircleDollarSign,
      tone: "bg-pink-50 text-pink-500",
    },
  ];
}

export default async function UserProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  let stats: BookingStats | null = null;

  try {
    stats = await getBookingStats(user.email);
  } catch (error) {
    console.error("Could not load booking statistics:", error);
  }

  const statCards = buildStatCards(stats);
  const initial = (user.name?.trim() || user.email).charAt(0).toUpperCase();

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-5xl px-5 pt-10 pb-20 sm:px-8 lg:pt-14 lg:pb-24">
        <header className="mb-7 sm:mb-8">
          <h1 className="text-[30px] leading-tight font-normal tracking-[-0.02em] text-neutral-900 sm:text-[36px]">
            My Profile
          </h1>
          <p className="mt-1.5 text-[13px] text-neutral-500 sm:text-sm">
            Manage your account settings and travel preferences
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
          <section
            aria-labelledby="profile-name"
            className="h-fit border border-neutral-200 bg-white p-5 text-center shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-6"
          >
            <div className="relative mx-auto w-fit">
              <Avatar className="size-24 border border-neutral-200">
                <AvatarImage
                  src={normalizeImageUrl(user.image) || undefined}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="bg-brand text-2xl font-medium text-white">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border-2 border-white bg-brand text-white shadow-sm"
              >
                <Camera className="size-3.5" strokeWidth={1.8} />
              </span>
            </div>

            <h2
              id="profile-name"
              className="mt-3 truncate text-base font-semibold tracking-tight text-neutral-900"
            >
              {user.name}
            </h2>

            <p className="mt-1 flex items-center justify-center gap-1 text-[11px] text-neutral-500">
              <MapPin aria-hidden="true" className="size-3" strokeWidth={1.8} />
              <span className="truncate">
                {user.location?.trim() || "Location not set"}
              </span>
            </p>

            <dl className="mt-5 space-y-2.5 border-t border-neutral-100 pt-4 text-[11px]">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-neutral-400">Member since</dt>
                <dd className="font-medium text-neutral-800">
                  {formatMemberSince(user.createdAt)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3">
                <dt className="text-neutral-400">Nationality</dt>
                <dd className="truncate font-medium text-neutral-800">
                  {user.nationality?.trim() || "Not set"}
                </dd>
              </div>
            </dl>

            <EditProfileDialog
              user={{
                name: user.name,
                image: user.image,
                location: user.location,
                nationality: user.nationality,
              }}
            />
          </section>

          <section aria-labelledby="stats-heading">
            <h2
              id="stats-heading"
              className="text-sm font-semibold tracking-tight text-neutral-900"
            >
              Travel Statistics
            </h2>

            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              {statCards.map(({ label, value, icon: Icon, tone }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-3 border border-neutral-200 bg-white p-4"
                >
                  <div className="min-w-0">
                    <dt className="text-[11px] text-neutral-500">{label}</dt>
                    <dd className="mt-2 text-xl font-semibold tracking-tight text-neutral-900">
                      {value}
                    </dd>
                  </div>

                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full",
                      tone
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.8}
                    />
                  </span>
                </div>
              ))}
            </dl>

            {!stats ? (
              <p className="mt-3 text-[11px] text-neutral-400">
                Travel statistics are unavailable right now.
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
