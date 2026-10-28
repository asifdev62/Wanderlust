export function DestinationsExplorerSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading destinations"
      className="mt-7 lg:mt-9"
    >
      <span className="sr-only">Loading destinations…</span>

      <div aria-hidden="true">
        <div className="grid overflow-hidden border border-neutral-200 sm:grid-cols-3">
          {[0, 1, 2].map((cell) => (
            <div
              key={cell}
              className="flex h-14.5 flex-col justify-center gap-2 border-b border-neutral-200 px-4 last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 sm:last:border-r-0"
            >
              <div className="h-2 w-14 animate-pulse bg-neutral-100" />
              <div className="h-3 w-28 animate-pulse bg-neutral-100" />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="h-3 w-36 animate-pulse bg-neutral-100" />
          <div className="h-3 w-20 animate-pulse bg-neutral-100" />
        </div>

        <div className="mt-5 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className=" `aspect-[8/5] `
              bg-neutral-100" />
              <div className="pt-4">
                <div className="h-2.5 w-16 bg-neutral-100" />
                <div className="mt-2.5 h-4 w-3/5 bg-neutral-100" />
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="h-3.5 w-20 bg-neutral-100" />
                  <div className="h-2.5 w-24 bg-neutral-100" />
                </div>
                <div className="mt-4 h-2.5 w-20 bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
