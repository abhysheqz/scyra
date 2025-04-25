import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const AppLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const session = await auth();

  if (!session) redirect("/auth/sign-in");

  return children;
};

export default AppLayout;
