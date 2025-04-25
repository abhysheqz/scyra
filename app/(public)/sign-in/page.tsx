import Input from "@/components/input";
import Button from "@/components/shared/button";
import GoogleSignInButton from "@/components/shared/google-signin-button";
import PageWrapper from "@/components/shared/page-wraper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const videos = [
  "/videos/basketball-captain.mp4",
  "/videos/ellie-williams.mp4",
  "/videos/ghost.mp4",
  "/videos/gojo-satoru.mp4",
  "/videos/sherlock-holmes.mp4",
  "/videos/space-adventurer.mp4",
];

const LoginPage = () => {
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  return (
    <PageWrapper className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center h-screen px-4 sm:px-8">
        <form className="w-full max-w-md space-y-6">
          <div className="w-full flex flex-col items-center gap-5">
            <Image
              src={"/logos/logo.png"}
              alt="Logo"
              width={130}
              height={130}
            />
            <p className="text-white/90 text-lg font-medium tracking-wider text-center">
              Welcome back to <span className="text-purple-300">Scyra</span>!
              <br />
              Please sign in to continue.
            </p>
          </div>

          <div className="space-y-4">
            <Input label="Email" name="email" type="email" required />
            <Input label="Password" name="password" type="password" required />
          </div>

          <Button type="submit" className="w-full tracking-wider" size={"lg"}>
            Sign In
          </Button>

          <div className="flex items-center justify-center">
            <div className="w-1/2 h-px bg-neutral-700"></div>
            <span className="bg-transparent px-4 text-gray-400 text-sm z-10">
              or
            </span>
            <div className="w-1/2 h-px bg-neutral-700"></div>
          </div>

          <GoogleSignInButton />

          <div className="text-center text-sm text-gray-400 font-medium tracking-widest">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-purple-400 hover:underline transition duration-200 outline-none"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden lg:block w-full lg:w-1/2 h-screen">
        <video
          src={randomVideo}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
        />
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
