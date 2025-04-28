import { motion } from "motion/react";
import React from "react";

const Alert: React.FC<IIconProps> = (props) => (
  <motion.div
    initial={{ scale: 0.9 }}
    animate={{
      scale: [1, 1.05, 1],
      rotate: [0, -5, 5, -5, 5, 0],
    }}
    transition={{
      scale: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      },
    }}
    whileHover={{
      scale: 1.1,
      transition: { duration: 0.2 },
    }}
    style={{ display: "inline-block" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}
    >
      <motion.path
        d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M11.992 16H12.001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      />
      <motion.path
        d="M12 13L12 8.99997"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          pathLength: [0, 1, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  </motion.div>
);

export default Alert;
