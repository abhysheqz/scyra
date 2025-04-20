import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-white font-medium tracking-wide text-lg"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            `
            bg-gradient-to-br from-neutral-800 to-neutral-900
            font-semibold
            rounded-3xl
            placeholder:text-white/50
            placeholder:text-lg
            placeholder:font-medium
            placeholder:tracking-wide
            py-4 px-6
            outline-none
            caret-white/80
            text-xl
            text-white
            border
            border-neutral-700
            focus:border-purple-800
            focus:ring-2
            focus:ring-purple-600/50
            focus:bg-neutral-900
            transition-all
            duration-300
            ease-in-out
            shadow-lg
            hover:shadow-xl
            w-full
          `,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
