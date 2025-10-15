"use client";

import { motion } from "framer-motion";

import { cn } from "@sd/ui/libs";

interface IProps {
  currentIndex: number;
  storiesLength: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationButtons: React.FC<IProps> = ({
  currentIndex,
  storiesLength,
  onPrevious,
  onNext,
}) => {
  return (
    <div
      className={cn(
        "fixed z-40 flex flex-col gap-4",
        "top-[calc(50vh-2rem)] -translate-y-1/2",
        "right-1 md:right-4",
      )}
    >
      <motion.button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-30"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        aria-label="이전 스토리로 이동"
      >
        ↑
      </motion.button>
      <motion.button
        onClick={onNext}
        disabled={currentIndex === storiesLength - 1}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-30"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        aria-label="다음 스토리로 이동"
      >
        ↓
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
