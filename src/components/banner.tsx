import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { name: "location", label: "Location", placeholder: "Address, City Or Zip" },
  {
    name: "date",
    label: "Date/Duration",
    placeholder: "Anytime /3 Days",
  },
  { name: "budget", label: "Budget", placeholder: "$0-$3000" },
  { name: "people", label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[760px] overflow-hidden bg-neutral-900 text-white sm:min-h-[720px] lg:min-h-[590px]"
    >
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise coastal bay surrounded by green hills"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/35" />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1400px] flex-col items-center justify-center px-6 pt-0 pb-[220px] text-center sm:min-h-[720px] sm:pb-[200px] lg:min-h-[590px] lg:pb-[51px]">
        <h1
          id="hero-heading"
          className="max-w-[880px] text-[52px] font-light leading-[0.92] tracking-[-0.02em] text-balance sm:text-6xl md:text-7xl lg:text-[84px] lg:leading-[1.02]"
        >
          Discover Your
          <br />
          Next Adventure
        </h1>

        <p className="mt-5 max-w-[560px] text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-[15px]">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:mt-8">
          <button
            type="button"
            className="bg-[#15A1BF] group flex h-11.5 items-center justify-center gap-4  px-7 text-xs font-semibold tracking-[0.06em] text-white uppercase transition-colors hover:bg-brand-dark sm:px-8 sm:text-sm"
          >
            Explore Now
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2}
            />
          </button>
          <button
            type="button"
            className="h-[46px] bg-white/25 px-5 text-xs font-semibold tracking-[0.06em] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/35 sm:text-sm"
          >
            View Destination
          </button>
        </div>
      </div>

      <div
        role="search"
        aria-label="Search destinations"
        className="absolute inset-x-0 bottom-0 z-20 bg-black/20 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-[1.2fr_1.1fr_1fr_1.3fr_174px]">
          {searchFields.map((field) => (
            <label
              key={field.name}
              className="flex cursor-text flex-col justify-center border-b border-white/30 px-5 py-5 lg:border-r lg:border-b-0 lg:py-[28px]"
            >
              <span className="text-sm leading-tight font-semibold sm:text-base">
                {field.label}
              </span>
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                autoComplete="off"
                className="mt-0.5 w-full min-w-0 bg-transparent text-[11px] text-white/90 outline-none placeholder:text-white/80 sm:text-xs"
              />
            </label>
          ))}

          <button
            type="button"
            className="col-span-2 flex h-14 items-center justify-center bg-brand px-8 text-base font-semibold text-white transition-colors hover:bg-brand-dark lg:col-span-1 lg:h-auto lg:text-lg"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
