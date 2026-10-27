// 'use client'
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
//   FieldSeparator,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { authClient } from "@/lib/auth-client"
// import Link from "next/link"
// import { redirect } from "next/navigation"
// import React from "react"

// export default function SignUpPage() {

// const handleSignUp = async (e: React.SubmitEvent<HTMLElement>) =>{
//     e.preventDefault()

//     const formData = new FormData(e.target)
//     const user = Object.fromEntries(formData.entries()) as{name: string, email:string, password: string}

//     console.log(user)

//     const {data, error} = await authClient.signUp.email({
//         ...user
//     })

//     if(data){
//         redirect("/")
//         console.log(data)

//     }
//     if(error){
//         console.log(error)
//     }

// }
//   return (
//     <div className="max-w-7xl mx-auto py-15">
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">Welcome back</CardTitle>
//           <CardDescription>
//             Login with your Apple or Google account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSignUp}>
//             <FieldGroup>
//               <Field>
//                 <Button variant="outline" type="button">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                     <path
//                       d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
//                       fill="currentColor"
//                     />
//                   </svg>
//                   Login with Apple
//                 </Button>
//                 <Button variant="outline" type="button">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                     <path
//                       d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//                       fill="currentColor"
//                     />
//                   </svg>
//                   Login with Google
//                 </Button>
//               </Field>
//               <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
//                 Or continue with
//               </FieldSeparator>
//               <Field>
//                 <FieldLabel htmlFor="name">Name</FieldLabel>
//                 <Input
//                   id="name"
//                   type="text"
//                   name="name"
//                   placeholder="Md Asif Ali"
//                   required
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   id="email"
//                   type="email"
//                   name="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </Field>
//               <Field>
//                 <div className="flex items-center">
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                   <a
//                     href="#"
//                     className="ml-auto text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input id="password" type="password" name="password" required />
//               </Field>
//               <Field>
//                 <Button type="submit">Create Account</Button>
//                 <FieldDescription className="text-center">
//                   Already have an account? <Link href="/login">Login</Link>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//       <FieldDescription className="px-6 text-center">
//         By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
//         and <a href="#">Privacy Policy</a>.
//       </FieldDescription>
//     </div>
//   )
// }





"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, UserRound, Mail, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

    const router = useRouter();
    
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    );

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        console.error("Signup error:", error);
        setErrorMessage(
          error.message || "Unable to create account. Please try again."
        );
        return;
      }

      if (data) {
        setSuccessMessage("Account created successfully!");
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
      setErrorMessage("Unable to sign up with Google.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-85 sm:max-w-92.5">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-[30px] font-normal tracking-tight text-[#171717] sm:text-[32px]">
            Create Account
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Start your adventure with Wanderlast
          </p>
        </div>

        {/* Signup Card */}
        <div className="border border-gray-100 bg-white px-5 py-6 shadow-md sm:px-5.5 sm:py-6">
          <form onSubmit={handleSignUp} className="space-y-3">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-[11px] font-medium text-gray-900 sm:text-xs"
              >
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="h-7.25 rounded-none border-gray-200 bg-[#f7f8fa] pl-8 text-[11px] shadow-none placeholder:text-gray-500 focus-visible:border-[#12A1C2] focus-visible:ring-1 focus-visible:ring-[#12A1C2] sm:h-7.75 sm:text-xs"
                />
              </div>
            </div>

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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-[11px] font-medium text-gray-900 sm:text-xs"
              >
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className="h-7.25 rounded-none border-gray-200 bg-[#f7f8fa] pl-8 pr-9 text-[11px] shadow-none placeholder:text-gray-500 focus-visible:border-[#12A1C2] focus-visible:ring-1 focus-visible:ring-[#12A1C2] sm:h-7.75 sm:text-xs"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#12A1C2]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={14} />
                  ) : (
                    <Eye size={14} />
                  )}
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
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-2.5">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[10px] text-gray-500 sm:text-xs">
              Or sign up with
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#12A1C2] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
