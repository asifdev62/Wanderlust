import { API_BASE_URL } from "@/lib/destinations";

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
