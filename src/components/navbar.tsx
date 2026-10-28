// "use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, UserRound, X } from "lucide-react";
// import { useEffect, useState } from "react";

// import { cn } from "@/lib/utils";
// import { authClient } from "@/lib/auth-client";
// import {
//   Popover,
//   PopoverContent,
//   PopoverDescription,
//   PopoverHeader,
//   PopoverTitle,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Button } from "./ui/button";

// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "Destinations", href: "/destinations" },
//   { label: "Add Destination", href: "/add-destination" },
//   { label: "My Bookings", href: "#bookings" },
//   { label: "Admin", href: "#admin" },
// ];

// function isActivePath(pathname: string, href: string) {
//   if (!href.startsWith("/")) {
//     return false;
//   }

//   return href === "/"
//     ? pathname === "/"
//     : pathname === href || pathname.startsWith(`${href}/`);
// }

// export function Navbar() {
//   const { data: session } = authClient.useSession()
//   const user = session?.user;
//   console.log(user)

//   const handleSignOut = ()=>{
//     authClient.signOut();
//   }
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     if (!menuOpen) {
//       return;
//     }

//     function handleKeyDown(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setMenuOpen(false);
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown);

//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [menuOpen]);

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white text-neutral-900">
//       <div className="mx-auto grid h-12 max-w-360 grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-10">
//         <nav
//           aria-label="Main navigation"
//           className="hidden items-center gap-7 lg:flex"
//         >
//           {navItems.map((item) => (
//             <Link
//               key={item.label}
//               href={item.href}
//               aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
//               className={cn(
//                 "text-sm font-medium transition-colors hover:text-brand",
//                 isActivePath(pathname, item.href) &&
//                 "text-brand underline decoration-2 underline-offset-[7px]"
//               )}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <button
//           type="button"
//           aria-label={menuOpen ? "Close menu" : "Open menu"}
//           aria-expanded={menuOpen}
//           aria-controls="mobile-navigation"
//           onClick={() => setMenuOpen((open) => !open)}
//           className="justify-self-start p-1 lg:hidden"
//         >
//           {menuOpen ? (
//             <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
//           ) : (
//             <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
//           )}
//         </button>

//         <Link
//           href="/"
//           aria-label="Wanderlast home"
//           className="justify-self-center"
//           onClick={() => setMenuOpen(false)}
//         >
//           <Image
//             src="/images/Wanderlast.png"
//             alt="Wanderlast"
//             width={162}
//             height={24}
//             priority
//             className="h-5 w-auto sm:h-6"
//           />
//         </Link>

//         <div className="hidden items-center justify-self-end gap-6 lg:flex lg:gap-7">
//           <Link
//             href="#profile"
//             className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand"
//           >
//             <UserRound
//               aria-hidden="true"
//               className="size-4"
//               strokeWidth={1.8}
//             />
//             Profile
//           </Link>

//           {
//             user ?  <Popover>
//             <PopoverTrigger render={ <Avatar>
//             <AvatarImage src={user?.image as string} />
//             <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
//           </Avatar>}>
//             </PopoverTrigger>
//             <PopoverContent>
//               <PopoverHeader>
//                 <PopoverTitle>{user?.name}</PopoverTitle>
//                 <PopoverDescription><p>{user?.email}</p></PopoverDescription>
//                 <Button onClick={handleSignOut} className={"bg-brand hover:bg-brand-dark"}>Sign Out</Button>
//               </PopoverHeader>
//             </PopoverContent>
//           </Popover> : <>
//                  <Link
//             href="/login"
//             className="text-sm font-medium transition-colors hover:text-brand"
//           >
//             Login
//           </Link>
//           <Link
//             href="/signUp"
//             className="text-sm font-medium transition-colors hover:text-brand"
//           >
//             Sign Up
//           </Link>
//           </>
//           }

//         </div>

//         <Link
//           href="/login"
//           className="justify-self-end text-sm font-medium lg:hidden"
//         >
//           Login
//         </Link>
//       </div>

//       {menuOpen && (
//         <div
//           id="mobile-navigation"
//           className="absolute inset-x-0 top-full border-t border-neutral-200 bg-white px-5 pt-2 pb-5 shadow-lg lg:hidden"
//         >
//           <nav aria-label="Mobile navigation" className="flex flex-col">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 aria-current={
//                   isActivePath(pathname, item.href) ? "page" : undefined
//                 }
//                 onClick={() => setMenuOpen(false)}
//                 className={cn(
//                   "border-b border-neutral-100 py-3 text-sm font-medium",
//                   isActivePath(pathname, item.href) && "text-brand"
//                 )}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center gap-6 pt-4 text-sm font-medium">
//             <Link href="#profile" onClick={() => setMenuOpen(false)}>
//               Profile
//             </Link>
//             <Link href="#login" onClick={() => setMenuOpen(false)}>
//               Login
//             </Link>
//             <Link href="#signup" onClick={() => setMenuOpen(false)}>
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, UserRound, X, LogOut, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverTrigger,
} from "@/components/ui/popover";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

type UserMenuProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSignOut: () => Promise<void>;
  signingOut: boolean;
  signOutError: string;
};

function UserMenu({
  user,
  onSignOut,
  signingOut,
  signOutError,
}: UserMenuProps) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label="Open user menu"
        className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#12A1C2]"
      >
        <Avatar className="size-9 cursor-pointer border border-gray-200">
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name ?? "User"}
          />
          <AvatarFallback className="bg-[#12A1C2] text-sm font-medium text-white">
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-64">
        <PopoverHeader>
          <PopoverTitle className="truncate text-sm">
            {user.name ?? "User"}
          </PopoverTitle>
          <PopoverDescription className="break-all text-xs">
            {user.email}
          </PopoverDescription>
        </PopoverHeader>

        {signOutError && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {signOutError}
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          disabled={signingOut}
          onClick={onSignOut}
          className="mt-3 w-full justify-center rounded-md bg-brand text-white text-center hover:bg-brand-dark hover:text-white"
        >
          {signingOut ? (
            <LoaderCircle className="mr-2 size-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 size-4" />
          )}
          {signingOut ? "Signing out..." : "Sign Out"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

type AuthLinksProps = {
  mobile?: boolean;
  isPending: boolean;
  user?: UserMenuProps["user"];
  onSignOut: () => Promise<void>;
  signingOut: boolean;
  signOutError: string;
  onNavigate: () => void;
};

function AuthLinks({
  mobile = false,
  isPending,
  user,
  onSignOut,
  signingOut,
  signOutError,
  onNavigate,
}: AuthLinksProps) {
  if (isPending) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-xs text-gray-500",
          mobile && "py-2"
        )}
      >
        <LoaderCircle className="size-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div
        className={cn(
          "flex items-center gap-3",
          mobile && "justify-between border-t border-gray-100 pt-4"
        )}
      >
        <Link
          href="/profile"
          onClick={onNavigate}
          className="flex min-w-0 items-center gap-2 text-sm font-medium transition-colors hover:text-brand"
        >
          <UserRound className="size-4 shrink-0" />
          <span className="truncate">Profile</span>
        </Link>

        <UserMenu
          user={user}
          onSignOut={onSignOut}
          signingOut={signingOut}
          signOutError={signOutError}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        mobile && "border-t border-gray-100 pt-4"
      )}
    >
      <Link
        href="/login"
        onClick={onNavigate}
        className="text-sm font-medium transition-colors hover:text-brand"
      >
        Login
      </Link>

      <Link
        href="/signUp"
        onClick={onNavigate}
        className="text-sm font-medium transition-colors hover:text-brand"
      >
        Sign Up
      </Link>
    </div>
  );
}

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);


  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);
    setSignOutError("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setSignOutError(error.message || "Unable to sign out.");
        return;
      }

      setMenuOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      setSignOutError("Something went wrong. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white text-neutral-900">
      <div className="mx-auto grid h-14 max-w-360 grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:h-16 lg:px-10">
        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 lg:flex xl:gap-7"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap text-sm font-medium transition-colors hover:text-brand",
                  active &&
                    "text-brand underline decoration-2 underline-offset-[7px]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="justify-self-start rounded-md p-1.5 transition-colors hover:bg-gray-100 lg:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
          ) : (
            <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
          )}
        </button>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Wanderlast home"
          className="justify-self-center"
          onClick={closeMenu}
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={32}
            priority
            className="h-6 w-auto object-contain sm:h-7"
          />
        </Link>

        {/* Desktop Authentication */}
        <div className="hidden items-center justify-self-end gap-5 lg:flex xl:gap-7">
          <AuthLinks
            isPending={isPending}
            user={user}
            onSignOut={handleSignOut}
            signingOut={signingOut}
            signOutError={signOutError}
            onNavigate={closeMenu}
          />
        </div>

        {/* Mobile Authentication */}
        <div className="flex items-center justify-self-end gap-3 lg:hidden">
          {isPending ? (
            <LoaderCircle
              aria-label="Loading session"
              className="size-4 animate-spin text-gray-500"
            />
          ) : user ? (
            <UserMenu
              user={user}
              onSignOut={handleSignOut}
              signingOut={signingOut}
              signOutError={signOutError}
            />
          ) : (
            <Link
              href="/login"
              onClick={closeMenu}
              className="text-sm font-medium transition-colors hover:text-brand"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-t border-neutral-200 bg-white px-5 pb-5 pt-2 shadow-lg sm:px-8 lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col"
          >
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                  className={cn(
                    "border-b border-neutral-100 py-3 text-sm font-medium transition-colors hover:text-brand",
                    active && "text-brand"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Authentication Links */}
          <div className="pt-4">
            <AuthLinks
              mobile
              isPending={isPending}
              user={user}
              onSignOut={handleSignOut}
              signingOut={signingOut}
              signOutError={signOutError}
              onNavigate={closeMenu}
            />
          </div>
        </div>
      )}
    </header>
  );
}
