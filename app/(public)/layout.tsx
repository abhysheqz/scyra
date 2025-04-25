import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const session = await auth();

  if (session) redirect("/dashboard");

  return children;
};

export default AuthLayout;
