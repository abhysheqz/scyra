"use server";

import { signIn } from "@/auth";
import { redisClient } from "./redis";
import { generateOtp } from "./utils";
import { sendMail } from "./resends";

export async function sendOtp({ email }: { email: string }) {
  try {
    const otp = generateOtp();

    console.log(otp);
    const redisKey = `otp:${email}`;

    await redisClient.setex(redisKey, 600, otp);

    sendMail({
      to: email,
      subject: "Your Scyra OTP Code",
      html: `
         <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <tr>
      <td style="padding: 40px 32px; text-align: center;">
        <!-- Logo -->
        <img src="https://i.ibb.co/WNXRFVdN/logo.png" alt="Scyra Logo" width="120" height="120" style="margin-bottom: 24px;">

        <!-- Header -->
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 16px;">Scyra OTP Verification</h1>
        <p style="color: #d1d5db; font-size: 16px; line-height: 24px; margin: 0 0 24px;">
          Thank you for signing in to <span style="color: #8b5cf6; font-weight: 600;">Scyra</span>! Please use the One-Time Password (OTP) below to verify your email.
        </p>

        <!-- OTP Box -->
        <div style="background-color: #8b5cf6; color: #ffffff; font-size: 32px; font-weight: 700; padding: 16px 24px; border-radius: 8px; display: inline-block; margin: 24px 0;">
          ${otp}
        </div>

        <p style="color: #d1d5db; font-size: 14px; line-height: 22px; margin: 0 0 24px;">
          This code is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email or contact our support team.
        </p>
      </td>
    </tr>
  </table>
</body>
       `,
    });

    return { success: true, message: "OTP sent to your email." };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP. Please try again." };
  }
}

export async function verifyOtp({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  try {
    const redisKey = `otp:${email}`;
    const storedOtp = await redisClient.get(redisKey);

    console.log(storedOtp);

    if (!storedOtp) {
      return { success: false, message: "OTP has expired or is invalid." };
    }

    if (storedOtp !== otp) {
      return { success: false, message: "Invalid OTP. Please try again." };
    }

    // await redisClient.del(redisKey);

    return { success: true, message: "OTP verified successfully." };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
    };
  }
}

// Google Sign-In
export async function googleSignIn() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signInWithCredentials({
  email,
  password,
  name,
  type = "sign-in",
}: {
  email: string;
  password: string;
  name?: string;
  type: "sign-in" | "sign-up";
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      type,
      name,
      redirect: false,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Sign in error:", error);

    return {
      success: false,
      error: error || "An unexpected error occurred during sign in.",
    };
  }
}
