
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff,  Mail, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInpage() {

    const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
 
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        console.error("Signup error:", error);
        setErrorMessage(
          error.message || "Unable to login. Please try again."
        );
        return;
      }

      if (data) {
        setSuccessMessage("Account login successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Google signup failed.");
      }
    } catch (error) {
      console.error("Google signup error:", error);
      setErrorMessage("Unable to sign In with Google.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-85 sm:max-w-92.5">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-[30px] font-normal tracking-tight text-[#171717] sm:text-[32px]">
            Welcome back
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Resume your adventure with Wanderlast
          </p>
        </div>

        {/* Signup Card */}
        <div className="border border-gray-100 bg-white px-5 py-6 shadow-md sm:px-5.5 sm:py-6">
          <form onSubmit={handleSignIn} className="space-y-3">
           
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-[11px] font-medium text-gray-900 sm:text-xs"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="h-7.25 rounded-none border-gray-200 bg-[#f7f8fa] pl-8 text-[11px] shadow-none placeholder:text-gray-500 focus-visible:border-[#12A1C2] focus-visible:ring-1 focus-visible:ring-[#12A1C2] sm:h-7.75 sm:text-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-[11px] font-medium text-gray-900 sm:text-xs"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-7.25 rounded-none border-gray-200 bg-[#f7f8fa] pl-8 pr-9 text-[11px] shadow-none placeholder:text-gray-500 focus-visible:border-[#12A1C2] focus-visible:ring-1 focus-visible:ring-[#12A1C2] sm:h-7.75 sm:text-xs"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#12A1C2]"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error and Success */}
            {errorMessage && (
              <p role="alert" className="text-xs text-red-600">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p role="status" className="text-xs text-green-700">
                {successMessage}
              </p>
            )}

            {/* Create Account */}
            <Button
              type="submit"
              disabled={loading}
              className="h-8 w-full rounded-none bg-[#12A1C2] text-[11px] font-medium text-white shadow-none hover:bg-[#0E89A5] disabled:opacity-60 sm:h-8 sm:text-xs"
            >
              {loading ? "Sign In..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-2.5">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[10px] text-gray-500 sm:text-xs">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          {/* Google Signup */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignUp}
            className="h-8 w-full rounded-none border-gray-200 bg-white text-[11px] font-normal text-gray-900 shadow-none hover:bg-gray-50 sm:text-xs"
          >
            <svg
              viewBox="0 0 48 48"
              className="mr-1 h-3 w-3"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.2 13.22l7.98 6.19C13.08 13.72 18.1 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.97 46.98 31.84 46.98 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.55 2.53 10.78l8-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-5.9 0-10.92-4.22-12.82-9.91l-8 6.19C6.51 43.62 14.62 48 24 48z"
              />
            </svg>
            Sign Up With Google
          </Button>

          {/* Sign In */}
          <p className="mt-4 text-center text-[10px] text-gray-500 sm:text-xs">
            Don&apos;t have an account?{" "}
            <Link
              href="/signUp"
              className="font-medium text-[#12A1C2] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
