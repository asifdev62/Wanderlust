import type { Metadata } from "next";

import { AddDestinationForm } from "./add-destination-form";

export const metadata: Metadata = {
  title: "Add New Travel Package — Wonderlast",
  description:
    "Create a new travel package and add it to the Wonderlast collection.",
};

export default function AddDestinationPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <h1 className="text-3xl font-light tracking-[-0.01em] text-neutral-900 sm:text-4xl">
          Add New Travel Package
        </h1>

        <div className="mt-8 flex justify-center lg:mt-10">
          <AddDestinationForm />
        </div>
      </div>
    </main>
  );
}
