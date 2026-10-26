"use client";

import { LoaderCircle, Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  getApiErrorMessage,
  getDestinationUrl,
  readJsonResponse,
  type Destination,
} from "@/lib/destinations";
import { cn } from "@/lib/utils";

const categories = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "luxury", label: "Luxury" },
] as const;

const categoryValues = new Set<string>(categories.map((item) => item.value));

const fieldClassName =
  "h-10 rounded-lg border-neutral-200 bg-neutral-50/70 px-3 text-sm shadow-none transition-all placeholder:text-neutral-400 focus-visible:border-brand focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-brand/15 disabled:cursor-not-allowed disabled:opacity-60";

const labelClassName = "text-sm font-medium text-neutral-700";

function getInitialCategory(category: string) {
  return categoryValues.has(category) ? category : "beach";
}

type EditDestinationDialogProps = {
  destination: Destination;
};

export function EditDestinationDialog({
  destination,
}: EditDestinationDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(() =>
    getInitialCategory(destination.category)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    setStatus(null);

    if (nextOpen) {
      setCategory(getInitialCategory(destination.category));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      destinationName: String(formData.get("destinationName") ?? ""),
      country: String(formData.get("country") ?? ""),
      category,
      price: String(formData.get("price") ?? ""),
      duration: String(formData.get("duration") ?? ""),
      departureDate: String(formData.get("departureDate") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? ""),
      description: String(formData.get("description") ?? ""),
    };

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(getDestinationUrl(destination._id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });

      const responseData = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(
            responseData,
            `Could not update destination (${response.status}).`
          )
        );
      }

      if (
        typeof responseData === "object" &&
        responseData !== null &&
        "matchedCount" in responseData &&
        responseData.matchedCount === 0
      ) {
        throw new Error(
          "Destination was not found. It may have been removed already."
        );
      }

      setStatus({
        tone: "success",
        message: "Destination updated successfully.",
      });
      router.refresh();
    } catch (error) {
      setStatus({
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not reach the server. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-9 rounded-none gap-2 border-neutral-200 bg-white px-4 text-xs font-medium text-neutral-700 shadow-none transition-all hover:border-brand hover:bg-neutral-50 hover:text-brand"
          >
            <Pencil
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.8}
            />
            Edit
          </Button>
        }
      />

      <DialogContent className="flex max-h-[85dvh] w-[calc(100%-2rem)] max-w-md flex-col gap-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-0 shadow-2xl sm:max-w-md">
        <DialogHeader className="shrink-0 border-b border-neutral-100 px-6 py-5 pr-14 text-left sm:pr-16 sm:pl-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
              <Pencil
                aria-hidden="true"
                className="size-5"
                strokeWidth={1.8}
              />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                Edit Destination
              </DialogTitle>

              <DialogDescription className="text-sm text-neutral-500">
                Update the destination details and travel package information.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
            {status && (
              <p
                role={status.tone === "error" ? "alert" : "status"}
                className={cn(
                  "rounded-lg border px-4 py-3 text-sm font-medium",
                  status.tone === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-600"
                )}
              >
                {status.message}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="edit-destination-name" className={labelClassName}>
                Destination Name
              </Label>

              <Input
                id="edit-destination-name"
                name="destinationName"
                defaultValue={destination.destinationName}
                autoComplete="off"
                required
                disabled={isSubmitting}
                className={fieldClassName}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-country" className={labelClassName}>
                  Country
                </Label>

                <Input
                  id="edit-country"
                  name="country"
                  defaultValue={destination.country}
                  autoComplete="country-name"
                  required
                  disabled={isSubmitting}
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category" className={labelClassName}>
                  Category
                </Label>

                <Select
                  items={categories}
                  name="category"
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "beach")}
                  disabled={isSubmitting}
                  required
                >
                  <SelectTrigger
                    id="edit-category"
                    className={cn(
                      fieldClassName,
                      "w-full data-[size=default]:h-10"
                    )}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-price" className={labelClassName}>
                  Price (USD)
                </Label>

                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  defaultValue={destination.price}
                  required
                  disabled={isSubmitting}
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-duration" className={labelClassName}>
                  Duration
                </Label>

                <Input
                  id="edit-duration"
                  name="duration"
                  defaultValue={destination.duration}
                  required
                  disabled={isSubmitting}
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-departure-date" className={labelClassName}>
                Departure Date
              </Label>

              <Input
                id="edit-departure-date"
                name="departureDate"
                type="date"
                defaultValue={destination.departureDate.split("T")[0] ?? ""}
                required
                disabled={isSubmitting}
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-image-url" className={labelClassName}>
                Image URL
              </Label>

              <Input
                id="edit-image-url"
                name="imageUrl"
                type="url"
                defaultValue={destination.imageUrl}
                autoComplete="url"
                required
                disabled={isSubmitting}
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description" className={labelClassName}>
                Description
              </Label>

              <Textarea
                id="edit-description"
                name="description"
                rows={4}
                defaultValue={destination.description}
                disabled={isSubmitting}
                className="min-h-28 resize-y rounded-lg border-neutral-200 bg-neutral-50/70 px-3 py-2.5 text-sm shadow-none transition-all placeholder:text-neutral-400 focus-visible:border-brand focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-brand/15 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-neutral-100 bg-neutral-50/70 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className="h-10 gap-2 rounded-lg border-neutral-200 bg-white px-5 text-sm font-medium"
            >
              <X aria-hidden="true" className="size-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />
              ) : (
                <Save aria-hidden="true" className="size-4" />
              )}
              {isSubmitting ? "Updating..." : "Update Destination"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDestinationDialog;
