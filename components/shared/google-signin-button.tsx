import React from "react";
import Button from "@/components/shared/button";
import Image from "next/image";
import { googleSignIn } from "@/lib/actions";

const GoogleSignInButton: React.FC = () => {
  return (
    <Button
      type="button"
      size={"lg"}
      className="w-full flex items-center justify-center gap-2 bg-white border-b-neutral-400 text-neutral-800"
      onClick={googleSignIn}
    >
      <Image
        src="/icons/google.svg"
        alt="Google"
        width={5}
        height={5}
        className="w-5 h-5"
      />
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
