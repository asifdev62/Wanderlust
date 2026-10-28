"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function RetryButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.refresh()}
      className={cn(
        "bg-brand px-5 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand-dark",
        className
      )}
    >
      {children}
    </button>
  );
}
