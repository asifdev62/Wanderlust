import { Banner } from "@/components/banner";
import { Cta } from "@/components/cta";
import { Navbar } from "@/components/navbar";
import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </main>
  );
}
