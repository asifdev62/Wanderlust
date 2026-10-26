"use client";

import Link from "next/link";
import { PackagePlus, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

const categories = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "luxury", label: "Luxury" },
] as const;

const fieldClassName =
  "h-9 rounded-md border-neutral-200 bg-neutral-50/70 px-3 text-sm shadow-none transition-colors placeholder:text-neutral-400 focus-visible:border-brand focus-visible:bg-white focus-visible:ring-brand/20";

const labelClassName = "text-xs font-semibold text-neutral-800";

export function AddDestinationForm() {
  const [category, setCategory] = useState("beach");
  const [status, setStatus] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("http://localhost:5000/add-destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData?.message ?? "Could not add destination.");
      }

      setStatus({ tone: "success", message: "Travel package added successfully." });
      form.reset();
      setCategory("beach");
    } catch (error) {
      setStatus({
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not reach the server. Please try again.",
      });
    }
  }

  return (
    <Card className="w-full max-w-[520px] gap-0 border border-neutral-200 bg-white py-0 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-0">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <CardContent className="flex flex-col gap-4 px-6 py-6 sm:px-7">
          {status && (
            <p
              role="status"
              className={cn(
                "rounded-md border px-3 py-2 text-xs font-medium",
                status.tone === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-600"
              )}
            >
              {status.message}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="destinationName" className={labelClassName}>
              Destination Name
            </Label>
            <Input
              id="destinationName"
              name="destinationName"
              placeholder="Bali Paradise"
              autoComplete="off"
              required
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="country" className={labelClassName}>
                Country
              </Label>
              <Input
                id="country"
                name="country"
                placeholder="Indonesia"
                autoComplete="country-name"
                required
                className={fieldClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category" className={labelClassName}>
                Category
              </Label>
              <Select
                items={categories}
                name="category"
                value={category}
                onValueChange={(value) => setCategory(value ?? "beach")}
                required
              >
                <SelectTrigger
                  id="category"
                  className={cn(
                    fieldClassName,
                    "w-full justify-between py-0 data-[size=default]:h-9"
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="price" className={labelClassName}>
                Price (USD)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="e.g., 1299"
                required
                className={fieldClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="duration" className={labelClassName}>
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 7 Days / 6 Nights"
                required
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="departureDate" className={labelClassName}>
              Departure Date
            </Label>
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              required
              className={cn(fieldClassName, "text-neutral-600")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="imageUrl" className={labelClassName}>
              Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              autoComplete="url"
              required
              className={fieldClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description" className={labelClassName}>
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe the travel experience..."
              className="min-h-28 rounded-md border-neutral-200 bg-neutral-50/70 px-3 py-2 text-sm shadow-none transition-colors placeholder:text-neutral-400 focus-visible:border-brand focus-visible:bg-white focus-visible:ring-brand/20"
            />
          </div>
        </CardContent>

        <CardFooter className="flex-col-reverse items-stretch gap-3 border-t-0 bg-transparent px-6 pb-6 pt-0 sm:flex-row sm:items-center sm:justify-end sm:px-7">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-9 justify-center gap-2 rounded-md border-red-200 bg-white px-4 text-xs font-medium text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-200 dark:bg-white"
            )}
          >
            <X className="size-4" strokeWidth={1.8} />
            Cancel
          </Link>

          <Button
            type="submit"
            className="h-9 justify-center gap-2 rounded-md bg-brand px-4 text-xs font-medium text-white hover:bg-brand-dark"
          >
            <PackagePlus className="size-4" strokeWidth={1.8} />
            Add Travel Package
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
