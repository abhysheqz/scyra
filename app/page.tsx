"use client";
import HeroSection from "@/components/modules/hero-section";
import Navbar from "@/components/modules/navbar";
import Button from "@/components/shared/button";
import toast from "@/components/shared/toaster";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <HeroSection />
      <Button
        onClick={() =>
          toast.success("I successed", { description: "yeah i succed" })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.error("I successed", { description: "yeah i succed" })
        }
      >
        Error
      </Button>
      <Button
        onClick={() => toast.loading("Message", { description: "Loading..." })}
      >
        Error
      </Button>
    </div>
  );
}
