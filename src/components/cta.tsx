import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section
      id="book"
      aria-labelledby="cta-heading"
      className="relative isolate flex min-h-[280px] items-center justify-center overflow-hidden bg-neutral-900 text-center lg:min-h-[440px]"
    >
      <Image
        src="/images/CTA.png"
        alt="Aerial view of a tropical island with a plane flying overhead"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="mx-auto flex max-w-[720px] flex-col items-center px-6 py-14">
        <h2
          id="cta-heading"
          className="text-3xl font-light tracking-[-0.01em] text-white lg:text-5xl"
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-2 text-[10px] text-white/90 lg:text-sm">
          Join thousands of travelers who have discovered the world with us
        </p>

        <button
          type="button"
          className="group mt-6 flex h-10 w-[272px] max-w-full items-center justify-between bg-white px-5 text-[10px] font-semibold tracking-[0.08em] text-neutral-900 uppercase transition-colors hover:bg-brand hover:text-white lg:mt-8 lg:h-14 lg:w-[330px] lg:px-8 lg:text-xs"
        >
          Book Your Trip Today
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1 lg:size-4"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </section>
  );
}
