import { Banner } from "@/components/banner";
import { Navbar } from "@/components/navbar";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Banner />
      <WhyChoose />
    </main>
  );
}
