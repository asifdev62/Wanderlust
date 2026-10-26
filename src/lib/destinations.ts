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
  const [year, month, day] = date.split("-");

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
