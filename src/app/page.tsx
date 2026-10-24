import { Banner } from "@/components/banner";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Banner />
    </main>
  );
}
