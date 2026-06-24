"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  delay = 0,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? { y: -6, transition: { duration: 0.25 } }
          : undefined
      }
      onClick={onClick}
      className={cn(
        "glass rounded-2xl p-6 transition-colors",
        hover && "cursor-pointer hover:border-[var(--accent)]/30",
        glow && "glow-accent",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
