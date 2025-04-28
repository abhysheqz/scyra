import { cn } from "@/lib/utils";
import React from "react";

interface PageWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-neutral-900 min-h-screen flex justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
