import * as React from "react";
import { Squircle as SquircleLoader } from "ldrs/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const squircleVariants = cva("", {
  variants: {
    variant: {
      default: "text-white",
      primary: "text-purple-500",
      secondary: "text-gray-600",
      success: "text-green-500",
      danger: "text-red-500",
      subtle: "text-gray-300",
    },
    sizeVariant: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    sizeVariant: "md",
  },
});

export interface SquircleProps extends VariantProps<typeof squircleVariants> {
  size?: number;
  stroke?: number;
  strokeLength?: number;
  speed?: number;
  bgOpacity?: number;
  color?: string;
}

const variantColorMap = {
  default: "#ffffff",
  primary: "#a855f7", // purple-500
  secondary: "#4b5563", // gray-600
  success: "#22c55e", // green-500
  danger: "#ef4444", // red-500
  subtle: "#d1d5db", // gray-300
};

const Squircle: React.FC<SquircleProps> = ({
  variant = "default",
  sizeVariant = "md",
  size,
  stroke,
  strokeLength,
  speed,
  bgOpacity,
  color,
}) => {
  const sizeConfig = {
    sm: { size: 16, stroke: 2, strokeLength: 0.2 },
    md: { size: 22, stroke: 3, strokeLength: 0.15 },
    lg: { size: 32, stroke: 4, strokeLength: 0.1 },
  };

  const defaultConfig = sizeConfig[sizeVariant!] || sizeConfig.md;

  // Use the provided color or fall back to the variant's mapped color
  const loaderColor =
    color || variantColorMap[variant!] || variantColorMap.default;

  return (
    <SquircleLoader
      size={size ?? defaultConfig.size}
      stroke={stroke ?? defaultConfig.stroke}
      strokeLength={strokeLength ?? defaultConfig.strokeLength}
      speed={speed ?? 0.9}
      bgOpacity={bgOpacity ?? 0.3}
      color={loaderColor}
    />
  );
};

export default Squircle;
