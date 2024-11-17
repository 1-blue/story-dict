"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

import { cn } from "#ui/libs";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export function PulsatingButton({
  className,
  children,
  pulseColor = "#6D28D9",
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  const FADE_ANIMATION_VARIANTS: Variants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" },
    },
  };

  return (
    <motion.button
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={FADE_ANIMATION_VARIANTS}
      className={cn(
        "relative text-center cursor-pointer flex justify-center items-center rounded-lg bg-primary text-white dark:bg-primary dark:text-white px-4 py-2",
        className
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration,
        } as React.CSSProperties
      }
      {...(props as any)}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </motion.button>
  );
}
