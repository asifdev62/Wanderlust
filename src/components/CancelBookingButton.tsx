
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  API_BASE_URL,
  getApiErrorMessage,
  readJsonResponse,
} from "@/lib/destinations";

export function CancelBookingButton({
  bookingId,
  email,
}: {
  bookingId: string;
  email: string;
}) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);

  async function cancelBooking() {
    setIsCancelling(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/bookings/${encodeURIComponent(bookingId)}?email=${encodeURIComponent(email)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(
            await readJsonResponse(response),
            `Could not cancel this booking (${response.status}).`
          )
        );
      }

      toast.success("Booking cancelled successfully.");

      // Re-render the server component so the deleted card disappears.
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not cancel this booking. Please try again."
      );
      setIsCancelling(false);
    }
  }

 function handleCancel() {
  if (isCancelling) {
    return;
  }

  toast("Cancel this booking?", {
    description: "This cannot be undone.",
    duration: 8000,
    classNames: {
      title: "!text-brand !font-semibold",
    },
    action: {
      label: "Yes, cancel",
      onClick: () => {
        void cancelBooking();
      },
    },
    actionButtonStyle: {
      backgroundColor: "var(--color-brand, #1b9bb8)",
      color: "#ffffff",
    },
    cancel: {
      label: "Keep it",
      onClick: () => {},
    },
    cancelButtonStyle: {
      backgroundColor: "transparent",
      color: "#374151",
      border: "1px solid #d1d5db",
    },
  });
}

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={isCancelling}
      className="inline-flex items-center gap-1.5 rounded-md border border-red-400 px-3 py-1.5 text-[11px] font-medium text-red-500 transition-colors hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
    >
      <Trash2 aria-hidden="true" className="size-3" strokeWidth={1.8} />
      {isCancelling ? "Cancelling..." : "Cancel"}
    </button>
  );
}