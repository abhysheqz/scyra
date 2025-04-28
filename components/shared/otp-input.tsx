"use client";

import React from "react";
import { OTPInput, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  autoFocus?: boolean;
  containerClassName?: string;
  slotClassName?: string;
}

function Slot(props: SlotProps & { className?: string }) {
  return (
    <div
      className={cn(
        "relative size-12 md:size-16 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border border-neutral-700 rounded-2xl md:rounded-3xl",
        "group-hover:border-purple-600/50 group-focus-within:border-purple-600/50",
        "bg-gradient-to-br from-neutral-800 to-neutral-900",
        "text-white font-semibold",
        "shadow-lg hover:shadow-xl",
        { "outline-2 outline-purple-600": props.isActive },
        props.className
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white/80" />
    </div>
  );
}

function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-neutral-600" />
    </div>
  );
}

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  maxLength = 6,
  autoFocus = true,
  containerClassName,
  slotClassName,
}) => {
  return (
    <OTPInput
      autoFocus={autoFocus}
      inputMode="numeric"
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      containerClassName={cn(
        "group flex items-center has-[:disabled]:opacity-30",
        containerClassName
      )}
      render={({ slots }) => (
        <>
          <div className="flex gap-2">
            {slots.slice(0, maxLength / 2).map((slot, idx) => (
              <Slot key={idx} {...slot} className={slotClassName} />
            ))}
          </div>
          <FakeDash />
          <div className="flex gap-2">
            {slots.slice(maxLength / 2).map((slot, idx) => (
              <Slot key={idx} {...slot} className={slotClassName} />
            ))}
          </div>
        </>
      )}
    />
  );
};

export default OtpInput;
