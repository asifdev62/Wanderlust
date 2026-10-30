import { SiOpencode } from "react-icons/si";

export type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

const DEFAULT_API_BASE_URL = "http://localhost:5000";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

export const DESTINATIONS_API_URL = `${API_BASE_URL}/destination`;
export const ADD_DESTINATION_API_URL = `${API_BASE_URL}/add-destination`;

export function getDestinationUrl(id: string) {
  return `${DESTINATIONS_API_URL}/${encodeURIComponent(id)}`;
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

/**
 * Normalizes a record returned by the Express/MongoDB API into a Destination.
 * Returns null when required fields are missing or have an unusable type.
 */
export function normalizeDestination(value: unknown): Destination | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;

  const id = toText(record._id);
  const destinationName = toText(record.destinationName);
  const imageUrl = toText(record.imageUrl);

  if (!id || !destinationName || !imageUrl) {
    return null;
  }

  return {
    _id: id,
    destinationName,
    country: toText(record.country) ?? "",
    category: toText(record.category) ?? "",
    price: toText(record.price) ?? "0",
    duration: toText(record.duration) ?? "",
    departureDate: toText(record.departureDate) ?? "",
    imageUrl,
    description: toText(record.description) ?? "",
  };
}

export function getApiErrorMessage(payload: unknown, fallback: string) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof payload.message === "string" &&
    payload.message.trim()
  ) {
    return payload.message;
  }

  return fallback;
}

export async function readJsonResponse(response: Response): Promise<unknown> {
  const body = await response.text();

  if (!body) {
    return null;
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
}

export function getDestinationPrice(price: string | number) {
  const amount =
    typeof price === "number" ? price : Number(price.replace(/[^0-9.]/g, ""));

  return Number.isFinite(amount) ? amount : 0;
}

export function formatDestinationPrice(price: string | number) {
  return `$${getDestinationPrice(price).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
}

export function formatDestinationDuration(duration: string) {
  if (!duration) {
    return "Flexible duration";
  }

  if (/\D/.test(duration)) {
    return duration;
  }

  const days = Number(duration);

  if (!Number.isFinite(days) || days <= 0) {
    return duration;
  }

  const nights = Math.max(days - 1, 0);

  return `${days} ${days === 1 ? "Day" : "Days"} / ${nights} ${
    nights === 1 ? "Night" : "Nights"
  }`;
}

/**
 * Reads the leading number from either "7" or "7 Days / 6 Nights".
 * Values without a number sort last.
 */
export function getDestinationDurationDays(duration: string) {
  const match = duration.match(/\d+/);

  if (!match) {
    return Number.POSITIVE_INFINITY;
  }

  const days = Number(match[0]);

  return Number.isFinite(days) ? days : Number.POSITIVE_INFINITY;
}

export function getDestinationRating(id: string) {
  const hash = Array.from(id).reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );

  return (4.5 + (hash % 6) / 10).toFixed(1);
}

export function getDestinationReviewCount(id: string) {
  const hash = Array.from(id).reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );

  return 96 + (hash % 384);
}

export function formatDepartureDate(date: string) {
  const datePart = date.split("T")[0] ?? "";
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
}

const highlightPrefixes =
  /^(?:explore|visit|discover|experience|enjoy|relax on|walk through|marvel at|see|take)\s+/i;

export function getDestinationHighlights(description: string) {
  if (!description) {
    return [];
  }

  const parts = description
    .trim()
    .replace(/\.$/, "")
    .split(/,\s*|\s+and\s+/)
    .map((part) => part.trim().replace(/^and\s+/i, ""))
    .filter(Boolean);

  if (parts.length < 2) {
    return [];
  }

  return Array.from(new Set(parts))
    .slice(0, 6)
    .map((part, index) => {
      const cleaned = index === 0 ? part.replace(highlightPrefixes, "") : part;

      return `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}`;
    });
}

export function formatCategoryLabel(category: string) {
  return category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
