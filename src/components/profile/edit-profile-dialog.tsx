"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { normalizeImageUrl } from "@/lib/images";

const fieldClassName =
  "h-10 rounded-lg border-neutral-200 bg-neutral-50/70 px-3 text-sm shadow-none transition-all placeholder:text-neutral-400 focus-visible:border-brand focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-brand/15";

const labelClassName = "text-sm font-medium text-neutral-700";

type ProfileUser = {
  name: string;
  image?: string | null;
  location?: string | null;
  nationality?: string | null;
};

export function EditProfileDialog({ user }: { user: ProfileUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location ?? "");
  const [nationality, setNationality] = useState(user.nationality ?? "");
  const [image, setImage] = useState(user.image ?? "");
  const [imageStatus, setImageStatus] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");
  const [isSaving, setIsSaving] = useState(false);

  const previewUrl = normalizeImageUrl(image);
  const initial = (name.trim() || "U").charAt(0).toUpperCase();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setName(user.name);
      setLocation(user.location ?? "");
      setNationality(user.nationality ?? "");
      setImage(user.image ?? "");
      setImageStatus("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    const nextName = name.trim();
    const nextImage = normalizeImageUrl(image);

    if (!nextName) {
      toast.error("Your name cannot be empty.");
      return;
    }

    if (nextImage && !/^https?:\/\//i.test(nextImage)) {
      toast.error("Image URL must start with http:// or https://.");
      return;
    }

    if (nextImage && imageStatus === "error") {
      toast.error(
        "That link didn't load as an image. Use a direct image URL instead."
      );
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: nextName,
        image: nextImage || null,
        location: location.trim(),
        nationality: nationality.trim(),
      });

      if (error) {
        throw new Error(error.message || "Could not update your profile.");
      }

      toast.success("Profile updated!", {
        description: "Your changes are now visible across the site.",
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update your profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="mt-5 h-9 w-full gap-2 rounded-md bg-brand text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand-dark">
            <Pencil aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
            Edit Profile
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight text-neutral-900">
            Edit profile
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-500">
            Update your personal details and travel preferences.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-neutral-50/60 p-3">
            <Avatar className="size-11 border border-neutral-200">
              <AvatarImage
                src={previewUrl || undefined}
                alt=""
                referrerPolicy="no-referrer"
                onLoadingStatusChange={setImageStatus}
              />
              <AvatarFallback className="bg-brand text-sm font-medium text-white">
                {initial}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="text-xs font-medium text-neutral-800">
                Photo preview
              </p>
              {imageStatus === "error" ? (
                <p className="text-[11px] text-red-600">
                  That link didn&apos;t load as an image. Use a direct image
                  link.
                </p>
              ) : (
                <p className="text-[11px] text-neutral-500">
                  Paste a direct image URL (right-click an image → Copy image
                  address).
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-name" className={labelClassName}>
              Full name
            </Label>
            <Input
              id="profile-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              maxLength={80}
              required
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-location" className={labelClassName}>
                Location
              </Label>
              <Input
                id="profile-location"
                name="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="San Francisco, CA"
                autoComplete="address-level2"
                maxLength={80}
                className={fieldClassName}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profile-nationality" className={labelClassName}>
                Nationality
              </Label>
              <Input
                id="profile-nationality"
                name="nationality"
                value={nationality}
                onChange={(event) => setNationality(event.target.value)}
                placeholder="United States"
                autoComplete="country-name"
                maxLength={80}
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-image" className={labelClassName}>
              Profile image URL
            </Label>
            <Input
              id="profile-image"
              name="image"
              type="url"
              value={image}
              onChange={(event) => {
                setImage(event.target.value);
                setImageStatus("idle");
              }}
              placeholder="https://example.com/photo.jpg"
              className={fieldClassName}
            />
            <p className="text-[11px] text-neutral-400">
              Use a direct image link, not a Google Images or photo-album page.
            </p>
          </div>

          <DialogFooter className="mt-1">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSaving}
                  className="rounded-md"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={isSaving}
              className="rounded-md bg-brand text-white hover:bg-brand-dark"
            >
              {isSaving ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
