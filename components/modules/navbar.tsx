import Image from "next/image";
import React from "react";
import Button from "@/components/shared/button";

const Navbar = () => {
  return (
    <nav className="w-full flex py-5 max-w-7xl  mx-auto justify-between items-center">
      <div>
        <Image
          src={"/logo.png"}
          width={500}
          height={500}
          alt="Logo"
          className="w-40 h-auto"
        />
      </div>
      <ul className="flex flex-row gap-5 text-white text-xl font-semibold">
        <li>Home</li>
        <li>About</li>
        <li>Pricing</li>
        <li>Features</li>
        <li>Testimonials</li>
      </ul>
      <div>
        <Button size={"lg"}>Get Started</Button>
      </div>
    </nav>
  );
};

export default Navbar;
