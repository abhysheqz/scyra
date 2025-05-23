// "use client";

// import React, { useCallback, useEffect } from "react";
// import { motion, useMotionTemplate, useMotionValue } from "motion/react";

// import { cn } from "@/lib/utils";

// export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
//   gradientSize?: number;
//   gradientColor?: string;
//   gradientOpacity?: number;
// }

// export function Card({
//   children,
//   className,
//   gradientSize = 200,
//   gradientColor = "#404040 ",
//   gradientOpacity = 0.5,
// }: CardProps) {
//   const mouseX = useMotionValue(-gradientSize);
//   const mouseY = useMotionValue(-gradientSize);

//   const handleMouseMove = useCallback(
//     (e: React.MouseEvent<HTMLDivElement>) => {
//       const { left, top } = e.currentTarget.getBoundingClientRect();
//       mouseX.set(e.clientX - left);
//       mouseY.set(e.clientY - top);
//     },
//     [mouseX, mouseY]
//   );

//   const handleMouseLeave = useCallback(() => {
//     mouseX.set(-gradientSize);
//     mouseY.set(-gradientSize);
//   }, [mouseX, mouseY, gradientSize]);

//   useEffect(() => {
//     mouseX.set(-gradientSize);
//     mouseY.set(-gradientSize);
//   }, [mouseX, mouseY, gradientSize]);

//   return (
//     <div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       className={cn(
//         " rounded-4xl  bg-neutral-800 border-b-3 border-b-neutral-700",
//         className
//       )}
//     >
//       <div className="z-10">{children}</div>
//       <motion.div
//         className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//         style={{
//           background: useMotionTemplate`
//             radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
//           `,
//           opacity: gradientOpacity,
//         }}
//       />
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
import React from "react";

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-4xl p-5 flex flex-col justify-center items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
