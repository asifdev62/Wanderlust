export default function DestinationDetailsLoading() {
  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-9 pb-20 sm:px-8 lg:px-10 lg:pt-12 lg:pb-24">
        <div
          role="status"
          aria-label="Loading destination"
          className="animate-pulse"
        >
          <span className="sr-only">Loading destination…</span>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="h-3 w-32 bg-neutral-100" />
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-[68px] border border-neutral-200" />
              <div className="h-8 w-[82px] border border-neutral-200" />
            </div>
          </div>

          <div className="mt-6 aspect-[16/10] bg-neutral-100 sm:aspect-[12/5] lg:mt-8" />

          <div className="mt-7 grid gap-8 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_336px]">
            <div>
              <div className="h-2.5 w-16 bg-neutral-100" />
              <div className="mt-3 h-9 w-2/5 bg-neutral-100" />
              <div className="mt-4 h-3 w-48 bg-neutral-100" />

              <div className="mt-8 h-5 w-24 bg-neutral-100" />
              <div className="mt-3 space-y-2.5">
                <div className="h-2.5 w-full bg-neutral-100" />
                <div className="h-2.5 w-11/12 bg-neutral-100" />
                <div className="h-2.5 w-4/5 bg-neutral-100" />
              </div>

              <div className="mt-8 h-5 w-24 bg-neutral-100" />
              <div className="mt-3 space-y-2.5">
                <div className="h-2.5 w-3/4 bg-neutral-100" />
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-2.5 w-4/5 bg-neutral-100" />
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[260px] border border-neutral-200 bg-neutral-50/60" />
          </div>
        </div>
      </div>
    </main>
  );
}
