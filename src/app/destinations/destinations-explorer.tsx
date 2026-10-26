"use client";

import { useMemo, useState } from "react";
import { RotateCcw, SearchX } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatCategoryLabel,
  getDestinationDurationDays,
  getDestinationPrice,
  type Destination,
  type SelectOption,
} from "@/lib/destinations";
import { cn } from "@/lib/utils";

import { DestinationCard } from "./destination-card";

type PriceRange =
  | "all"
  | "under-10000"
  | "10000-30000"
  | "30000-60000"
  | "60000-plus";

type SortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "name-asc";

const priceRanges: SelectOption[] = [
  { value: "all", label: "All prices" },
  { value: "under-10000", label: "Under $10,000" },
  { value: "10000-30000", label: "$10,000 – $30,000" },
  { value: "30000-60000", label: "$30,000 – $60,000" },
  { value: "60000-plus", label: "$60,000+" },
];

const sortOptions: SelectOption[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "duration-asc", label: "Duration: Short to Long" },
  { value: "name-asc", label: "Name: A to Z" },
];

type FilterSelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  isActive?: boolean;
  onChange: (value: string) => void;
};

function FilterSelect({
  label,
  value,
  options,
  isActive = false,
  onChange,
}: FilterSelectProps) {
  return (
    <Select
      items={options}
      value={value}
      onValueChange={(nextValue) =>
        onChange(nextValue ?? options[0]?.value ?? "all")
      }
    >
      <SelectTrigger
        aria-label={label}
        className="group h-14.5 w-full items-center justify-between gap-3 rounded-none border-0 bg-transparent px-4 text-left whitespace-normal shadow-none transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-inset data-[size=default]:h-14.5 sm:px-5"
      >
        <span className="flex min-w-0 flex-col items-start gap-0.5">
          <span
            className={cn(
              "text-[9px] font-semibold tracking-[0.16em] uppercase transition-colors",
              isActive ? "text-brand" : "text-neutral-400"
            )}
          >
            {label}
          </span>
          <SelectValue
            className={cn(
              "max-w-full truncate text-[13px] font-normal",
              isActive ? "text-brand" : "text-neutral-800"
            )}
          />
        </span>
      </SelectTrigger>

      <SelectContent align="start" alignItemWithTrigger={false} className="rounded-none">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-5 flex flex-col items-center border border-dashed border-neutral-200 bg-neutral-50/60 px-6 py-16 text-center">
      <SearchX
        aria-hidden="true"
        className="size-8 text-neutral-300"
        strokeWidth={1.4}
      />
      <h2 className="mt-4 text-lg font-normal text-neutral-900">
        No destinations found
      </h2>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-neutral-500">
        Try a different category or price range to find your next adventure.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 bg-brand px-5 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand-dark"
      >
        Clear filters
      </button>
    </div>
  );
}

export function DestinationsExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  const categoryOptions = useMemo<SelectOption[]>(() => {
    const categories = Array.from(
      new Set(destinations.map((destination) => destination.category))
    ).sort((first, second) => first.localeCompare(second));

    return [
      { value: "all", label: "All categories" },
      ...categories.map((item) => ({
        value: item,
        label: formatCategoryLabel(item),
      })),
    ];
  }, [destinations]);

  const visibleDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      const price = getDestinationPrice(destination.price);
      const matchesCategory = category === "all" || destination.category === category;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-10000" && price < 10000) ||
        (priceRange === "10000-30000" && price >= 10000 && price < 30000) ||
        (priceRange === "30000-60000" && price >= 30000 && price < 60000) ||
        (priceRange === "60000-plus" && price >= 60000);

      return matchesCategory && matchesPrice;
    });

    if (sortBy === "price-asc") {
      filtered.sort(
        (first, second) =>
          getDestinationPrice(first.price) - getDestinationPrice(second.price)
      );
    } else if (sortBy === "price-desc") {
      filtered.sort(
        (first, second) =>
          getDestinationPrice(second.price) - getDestinationPrice(first.price)
      );
    } else if (sortBy === "duration-asc") {
      filtered.sort(
        (first, second) =>
          getDestinationDurationDays(first.duration) -
          getDestinationDurationDays(second.duration)
      );
    } else if (sortBy === "name-asc") {
      filtered.sort((first, second) =>
        first.destinationName.localeCompare(second.destinationName)
      );
    }

    return filtered;
  }, [category, destinations, priceRange, sortBy]);

  const isFiltering = category !== "all" || priceRange !== "all";
  const hasActiveControls = isFiltering || sortBy !== "recommended";

  function resetFilters() {
    setCategory("all");
    setPriceRange("all");
    setSortBy("recommended");
  }

  return (
    <div className="mt-7 lg:mt-9">
      <div className="grid divide-y divide-neutral-200 overflow-hidden border border-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <FilterSelect
          label="Category"
          value={category}
          options={categoryOptions}
          isActive={category !== "all"}
          onChange={setCategory}
        />
        <FilterSelect
          label="Price range"
          value={priceRange}
          options={priceRanges}
          isActive={priceRange !== "all"}
          onChange={(value) => setPriceRange(value as PriceRange)}
        />
        <FilterSelect
          label="Sort by"
          value={sortBy}
          options={sortOptions}
          isActive={sortBy !== "recommended"}
          onChange={(value) => setSortBy(value as SortOption)}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-xs text-neutral-500">
          Showing{" "}
          <span className="font-medium text-neutral-800">
            {visibleDestinations.length}
          </span>{" "}
          {isFiltering ? (
            <>
              of{" "}
              <span className="font-medium text-neutral-800">
                {destinations.length}
              </span>{" "}
            </>
          ) : null}
          {visibleDestinations.length === 1 ? "destination" : "destinations"}
        </p>

        {hasActiveControls ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.08em] text-neutral-500 uppercase transition-colors hover:text-brand"
          >
            <RotateCcw aria-hidden="true" className="size-3" strokeWidth={1.8} />
            Clear filters
          </button>
        ) : null}
      </div>

      {visibleDestinations.length > 0 ? (
        <ul
          role="list"
          className="mt-5 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-10"
        >
          {visibleDestinations.map((destination, index) => (
            <li key={destination._id}>
              <DestinationCard
                destination={destination}
                priority={index < 3}
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState onReset={resetFilters} />
      )}
    </div>
  );
}
