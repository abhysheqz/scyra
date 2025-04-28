"use client";

import React from "react";
import { toast as sonnerToast } from "sonner";
import { motion } from "motion/react";
import Squircle from "@/components/loaders/squircle";
import Tick from "@/components/icons/tick";
import Alert from "../icons/alert";
import Eraser from "../icons/eraser";

type ToastVariant = "success" | "error" | "pending";
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastOptions {
  id?: string | number;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
  onDismiss?: () => void;
}

/** Main toast function with your original styling preserved */
export function toast(options: ToastOptions | string) {
  const toastOptions =
    typeof options === "string" ? { title: options } : options;

  const id = toastOptions.id || Math.random().toString(36).substring(2, 9);

  return sonnerToast.custom(
    (toastId) => (
      <Toast
        id={toastId}
        title={toastOptions.title || ""}
        description={toastOptions.description}
        variant={toastOptions.variant}
        onDismiss={() => {
          toastOptions.onDismiss?.();
          sonnerToast.dismiss(toastId);
        }}
      />
    ),
    {
      duration: toastOptions.duration || 5000,
      position: toastOptions.position,
    }
  );
}

/** Variant shortcuts that maintain your original styling */
toast.success = (message: string, options?: Omit<ToastOptions, "variant">) =>
  toast({ ...options, title: message, variant: "success" });

toast.error = (message: string, options?: Omit<ToastOptions, "variant">) =>
  toast({ ...options, title: message, variant: "error" });

toast.loading = (message: string, options?: Omit<ToastOptions, "variant">) =>
  toast({ ...options, title: message, variant: "pending" });

toast.dismiss = sonnerToast.dismiss;
toast.promise = sonnerToast.promise;

/** Your original Toast component with exact same styling */
function Toast(props: {
  id: string | number;
  title: string;
  description?: string;
  variant?: ToastVariant;
  onDismiss: () => void;
}) {
  const { title, description, id, variant = "success" } = props;

  // Your original variant-specific styling
  const variantStyles = {
    success: {
      gradient: "from-neutral-800 to-neutral-900",
      border: "border-neutral-700",
      buttonBg: "bg-green-600 hover:bg-green-700",
      buttonRing: "focus:ring-green-500 focus:ring-offset-green-900",
      icon: <Tick className="w-9 h-9 text-green-400" />,
    },
    error: {
      gradient: "from-neutral-800 to-neutral-900",
      border: "border-neutral-700",
      buttonBg: "bg-red-600 hover:bg-red-700",
      buttonRing: "focus:ring-red-500 focus:ring-offset-red-900",
      icon: <Alert className="w-9 h-9 text-red-400" />,
    },
    pending: {
      gradient: "from-neutral-800 to-neutral-900",
      border: "border-neutral-700",
      buttonRing: "focus:ring-blue-500 focus:ring-offset-blue-900",
      icon: <Squircle variant={"primary"} />,
    },
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-[350px] bg-gradient-to-r ${styles.gradient} shadow-xl rounded-3xl p-5 border ${styles.border}`}
      role="alert"
    >
      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="items-center mr-3 inline-flex"
      >
        {styles.icon}
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          className="text-base font-semibold text-white tracking-wide"
        >
          {title}
        </motion.p>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            className="mt-1 text-sm text-neutral-300/90 leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
        onClick={props.onDismiss}
        className="p-1 rounded-full hover:bg-neutral-700/50 transition-colors duration-200 place-self-center"
        aria-label="Close toast"
      >
        <Eraser className="w-6 h-6 text-neutral-400" />
      </motion.button>
    </motion.div>
  );
}

export default toast;
