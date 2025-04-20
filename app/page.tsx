import HeroSection from "@/components/modules/hero-section";
import Navbar from "@/components/modules/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <HeroSection />
    </div>
  );
}
