import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-lg font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-tr from-purple-500 to-purple-600 text-white rounded-2xl border-b-3 border-b-purple-400",
        outline:
          "border-2 border-purple-500 bg-transparent text-purple-500 rounded-2xl hover:bg-purple-500/10 hover:scale-105",
        secondary:
          "bg-gradient-to-tr from-gray-700 to-gray-800 text-white rounded-2xl hover:scale-105",
        ghost:
          "bg-transparent text-purple-500 hover:bg-purple-500/10 rounded-2xl hover:scale-105",
        danger:
          "bg-red-500 border-b hover:bg-red-500/80 rounded-2xl border-b-red-300 border-b-2",
      },
      size: {
        default: "py-2 px-5",
        sm: "py-1 px-3 text-base",
        lg: "py-3 px-7 text-xl rounded-3xl",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
