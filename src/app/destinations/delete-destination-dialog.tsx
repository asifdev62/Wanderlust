"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { FiAlertTriangle } from "react-icons/fi";
import { RiCloseLine, RiDeleteBinLine } from "react-icons/ri";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  getApiErrorMessage,
  getDestinationUrl,
  readJsonResponse,
} from "@/lib/destinations";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type DeleteDestinationDialogProps = {
  id: string;
};

export function DeleteDestinationDialog({ id }: DeleteDestinationDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteDestination = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const token = await getTokenFromClient()
      const res = await fetch(getDestinationUrl(id), {
        method: "DELETE",
         headers: {
          "Content-Type": "application/json",
           authorization: `Bearer ${token}`
        },
        signal: AbortSignal.timeout(15000),
      });

      const data = await readJsonResponse(res);

      if (!res.ok) {
        throw new Error(
          getApiErrorMessage(
            data,
            `Could not delete package (${res.status}).`
          )
        );
      }

      setOpen(false);
      router.push("/destinations");
      router.refresh();
    } catch (err) {
      console.error("Could not delete destination:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete package. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setError(null);
        }
      }}
    >
      {/* Delete Trigger Button */}
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="inline-flex h-9 items-center gap-2 rounded-none border-red-300 bg-white px-3.5 text-xs font-medium text-red-500 shadow-none transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-600"
          >
            <RiDeleteBinLine size={16} />
            Delete
          </Button>
        }
      />

      {/* Confirmation Dialog */}
      <AlertDialogContent className="rounded-none">
        <AlertDialogHeader>
          {/* Dialog Title */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <FiAlertTriangle
                className="text-red-600"
                size={20}
                aria-hidden="true"
              />
            </div>

            <AlertDialogTitle className="text-lg font-semibold text-neutral-900">
              Delete Travel Package
            </AlertDialogTitle>
          </div>

          {/* Dialog Description */}
          <AlertDialogDescription className="pt-2 text-sm leading-6 text-neutral-500">
            Are you sure you want to delete this travel package? This action
            cannot be undone.
          </AlertDialogDescription>

          {error && (
            <p role="alert" className="pt-2 text-xs font-medium text-red-600">
              {error}
            </p>
          )}
        </AlertDialogHeader>

        {/* Action Buttons */}
        <AlertDialogFooter>
          {/* Cancel Button */}
          <AlertDialogCancel
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-none border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100"
          >
            <RiCloseLine size={16} />
            Cancel
          </AlertDialogCancel>

          {/* Delete Button */}
          <AlertDialogAction
            onClick={handleDeleteDestination}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-none bg-red-600 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <RiDeleteBinLine size={16} />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDestinationDialog;
