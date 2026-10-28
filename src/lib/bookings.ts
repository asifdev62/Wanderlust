import { API_BASE_URL, getDestinationPrice } from "@/lib/destinations";

/**
 * Booking record as returned by `GET /my-bookings/:email`.
 *
 * The Express API inserts the whole destination document plus the booking
 * fields, so the title/image/price live under both destination-style and
 * booking-style keys. `status` is never written by the API.
 */
export type Booking = {
  _id: string;
  title: string;
  image: string | null;
  status: string;
  departureDate: string;
  price: string;
};

export function getMyBookingsUrl(email: string) {
  return `${API_BASE_URL}/my-bookings/${encodeURIComponent(email)}`;
}

function toText(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
}

export function normalizeBooking(value: unknown): Booking | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;

  const id = toText(record._id) ?? toText(record.id);
  const title = toText(record.title) ?? toText(record.destinationName);

  if (!id || !title) {
    return null;
  }

  return {
    _id: id,
    title,
    image: toText(record.image) ?? toText(record.imageUrl),
    // The API has no status field yet; existing bookings are confirmed.
    status: toText(record.status) ?? "confirmed",
    departureDate: toText(record.departureDate) ?? "",
    price: toText(record.price) ?? "0",
  };
}

export type BookingStats = {
  totalBookings: number;
  countriesVisited: number;
  upcomingTrips: number;
  totalSpent: number;
};

function toRecords(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    "bookings" in payload &&
    Array.isArray((payload as { bookings: unknown }).bookings)
  ) {
    return (payload as { bookings: unknown[] }).bookings;
  }

  return [];
}

function isUpcoming(date: string) {
  const [year, month, day] = date.split("T")[0].split("-").map(Number);

  if (!year || !month || !day) {
    return false;
  }

  const departure = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return departure >= today;
}

/**
 * Aggregates the user's bookings for the profile page. The Express API stores
 * the destination fields on each booking, so country/price/departureDate are
 * available without extra requests.
 */
export async function getBookingStats(email: string): Promise<BookingStats> {
  const response = await fetch(getMyBookingsUrl(email), {
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Could not load bookings (${response.status}).`);
  }

  const records = toRecords(await response.json());
  const countries = new Set<string>();
  let upcomingTrips = 0;
  let totalSpent = 0;

  for (const value of records) {
    if (typeof value !== "object" || value === null) {
      continue;
    }

    const record = value as Record<string, unknown>;
    const country = toText(record.country)?.trim().toLowerCase();

    if (country) {
      countries.add(country);
    }

    const price = toText(record.price);

    if (price) {
      totalSpent += getDestinationPrice(price);
    }

    if (isUpcoming(toText(record.departureDate) ?? "")) {
      upcomingTrips += 1;
    }
  }

  return {
    totalBookings: records.length,
    countriesVisited: countries.size,
    upcomingTrips,
    totalSpent,
  };
}
