"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import Button from "@/components/shared/button";
import PageWrapper from "@/components/shared/page-wraper";
import OtpInput from "@/components/shared/otp-input";
import Squircle from "@/components/loaders/squircle";
import toast from "@/components/shared/toaster";

import useOtpCooldown from "@/hooks/use-otp-cooldown";
import { verifyOtp, sendOtp, signInWithCredentials } from "@/lib/actions";
import { getRandomVideo } from "@/lib/utils";
import Alert from "@/components/icons/alert";
import Back from "@/components/icons/back";

const ErrorState = () => (
  <PageWrapper className="flex flex-col lg:flex-row">
    <div className="w-full lg:w-1/2 flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 text-center"
      >
        <div className="space-y-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.6 }}
          >
            <Alert className="h-10 w-10 text-red-400 mx-auto" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">No Access!</h1>
            <p className="text-gray-400">
              Oops! Either the procedure was incorrect
              <br />
              or your session expired.
            </p>
          </div>
        </div>

        <Link href="/sign-in" className="block">
          <Button size="lg" className="w-full gap-2 group">
            <Back
              color="white"
              className="group-hover:-translate-x-2 transition-transform duration-150 size-8"
            />
            <span>Go to Sign In</span>
          </Button>
        </Link>
      </motion.div>
    </div>

    <div className="hidden lg:block w-full lg:w-1/2 h-screen relative">
      <div className="absolute inset-0 bg-black/30" />
      <video
        src={getRandomVideo().src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
      />
    </div>
  </PageWrapper>
);

const OtpPage: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [userData, setUserData] = useState<any>(null); // State to store user data
  const { resendCooldown, formatCooldownTime, setResendCooldown } =
    useOtpCooldown();

  const videoSrc = React.useMemo(() => getRandomVideo().src, []);

  // Fetch user data only on the client-side
  useEffect(() => {
    const userDataString = sessionStorage.getItem("user-data");
    if (userDataString) {
      setUserData(JSON.parse(userDataString)); // Store user data in state
    }
  }, []);

  // If no user data, show the error UI
  if (!userData) {
    return <ErrorState />;
  }

  const email = userData?.email;
  const password = userData?.password;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await verifyOtp({ email, otp });

    if (response.success) {
      sessionStorage.removeItem("user-data");
      sessionStorage.removeItem("otpResendCooldownEnd");

      try {
        const signInResponse = await signInWithCredentials({
          email,
          password,
          type: "sign-in",
        });

        console.log(signInResponse);

        if (signInResponse?.error) {
          toast.error("Sign In Failed", {
            description: signInResponse.error,
          });
          setIsSubmitting(false);
        } else {
          router.push("/dashboard");
        }
      } catch (error: any) {
        toast.error(error?.message || "Sign In Error", {
          description: "An error occurred during sign-in. Please try again.",
        });
        setIsSubmitting(false);
      }
    } else {
      toast.error("Invalid Code", {
        description: "The code you entered is wrong. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResending || resendCooldown > 0) return;

    setIsResending(true);
    setOtp("");
    setResendCooldown(60);

    const endTime = Math.floor(Date.now() / 1000) + 60;
    sessionStorage.setItem("otpResendCooldownEnd", endTime.toString());

    const response = await sendOtp({ email });
    if (!response.success) {
      toast.error("Resend Failed", {
        description: "We couldn't send a new code. Please try again later.",
      });
    }
    setIsResending(false);
  };

  return (
    <PageWrapper className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center h-screen px-4 sm:px-8">
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
          <div className="w-full flex flex-col items-center gap-5">
            <Image
              src="/logos/logo.png"
              alt="Scyra Logo"
              width={130}
              height={130}
            />
            <p className="text-white/90 text-lg font-medium tracking-wider text-center">
              Verify your identity with{" "}
              <span className="text-purple-500">Scyra</span>!
              <br />
              Enter the 6-digit code sent to{" "}
              <span className="text-purple-500">{email}</span>.
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <OtpInput value={otp} onChange={setOtp} maxLength={6} />
          </div>
          <Button
            type="submit"
            className="w-full tracking-wider gap-3"
            size="lg"
            disabled={isSubmitting || otp.length !== 6}
          >
            {isSubmitting && <Squircle />}
            <span>{isSubmitting ? "Verifying..." : "Verify OTP"}</span>
          </Button>
          <div className="text-center text-sm text-gray-400 font-medium tracking-widest">
            {resendCooldown > 0 ? (
              <p>
                You can send OTP again after{" "}
                <span className="text-purple-500">
                  {formatCooldownTime(resendCooldown)}
                </span>
              </p>
            ) : (
              <>
                Didn't receive a code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className={`text-purple-500 hover:underline transition duration-200 outline-none ${
                    isResending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isResending}
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <div className="hidden lg:block w-full lg:w-1/2 h-screen">
        <video
          src={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
        />
      </div>
    </PageWrapper>
  );
};

export default OtpPage;
