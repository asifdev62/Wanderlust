import Link from "next/link";
import { ArrowLeft, MapPinOff } from "lucide-react";

export default function DestinationNotFound() {
  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 py-24 text-center sm:px-8 lg:px-10 lg:py-32">
        <MapPinOff
          aria-hidden="true"
          className="size-10 text-neutral-300"
          strokeWidth={1.4}
        />
        <h1 className="mt-5 text-2xl font-light tracking-[-0.01em] text-neutral-900 sm:text-3xl">
          Destination not found
        </h1>
        <p className="mt-2 max-w-sm text-xs leading-relaxed text-neutral-500">
          The destination you&apos;re looking for may have been removed, or the
          link is incorrect.
        </p>
        <Link
          href="/destinations"
          className="mt-7 inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand-dark"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          Browse destinations
        </Link>
      </div>
    </main>
  );
}
