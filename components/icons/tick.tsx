import { motion } from "motion/react";
import React from "react";

interface IIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  animate?: boolean;
  animationDuration?: number;
  circleAnimationDelay?: number;
  checkAnimationDelay?: number;
}

const Tick: React.FC<IIconProps> = ({
  size = 24,
  color = "#000000",
  animate = true,
  animationDuration = 0.5,
  circleAnimationDelay = 0.3,
  checkAnimationDelay = 0.8,
  ...props
}) => {
  // Animation variants
  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: animationDuration,
          delay: circleAnimationDelay,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.01,
          delay: circleAnimationDelay,
        },
      },
    },
  };

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: animationDuration,
          delay: checkAnimationDelay,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.01,
          delay: checkAnimationDelay,
        },
      },
    },
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color={color}
      fill="none"
      {...props}
    >
      <motion.path
        d="M21.4477 8.2C21.5 9.25014 21.5 10.4994 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C13.0719 2.5 14.0156 2.5 14.85 2.51908"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={animate ? "hidden" : "visible"}
        animate="visible"
        variants={circleVariants}
      />
      <motion.path
        d="M8 11.5C8 11.5 9.5 11.5 11.5 15C11.5 15 16.5588 5.83333 21.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? "hidden" : "visible"}
        animate="visible"
        variants={checkVariants}
      />
    </svg>
  );
};

export default Tick;
