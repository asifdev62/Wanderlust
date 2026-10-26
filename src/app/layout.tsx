import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const JosefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wonderlast — Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${JosefinSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
