"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useSidebar } from "@sd/ui";
import { cn } from "@sd/ui/libs";

import { MAX_INDICATORS } from "../../_constants";

const getIndicatorRange = (storiesLength: number, currentIndex: number) => {
  if (storiesLength <= MAX_INDICATORS) {
    return { start: 0, end: storiesLength };
  }

  const half = Math.floor(MAX_INDICATORS / 2);
  let start = Math.max(0, currentIndex - half);
  const end = Math.min(storiesLength, start + MAX_INDICATORS);

  if (end - start < MAX_INDICATORS) {
    start = Math.max(0, end - MAX_INDICATORS);
  }

  return { start, end };
};

interface IProps {
  currentIndex: number;
  storiesLength: number;
  onIndicatorClick: (index: number) => void;
}

const StoryIndicators: React.FC<IProps> = ({
  currentIndex,
  storiesLength,
  onIndicatorClick,
}) => {
  const { open: sidebarOpen } = useSidebar();

  const { start, end } = getIndicatorRange(storiesLength, currentIndex);

  const indicatorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <motion.div
      className={cn(
        "fixed left-2 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 md:left-6",
        sidebarOpen && "md:left-[calc(16rem+1.5rem)]",
      )}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
    >
      <AnimatePresence mode="sync">
        {Array.from({ length: end - start }, (_, i) => {
          const storyIndex = start + i;
          const isActive = storyIndex === currentIndex;

          return (
            <motion.button
              key={`indicator-${storyIndex}`}
              onClick={() => onIndicatorClick(storyIndex)}
              className={cn(
                "w-1 cursor-pointer rounded-full",
                isActive
                  ? "h-8 bg-white shadow-lg"
                  : "h-4 bg-white/40 hover:bg-white/60",
              )}
              variants={indicatorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              aria-label={`${storyIndex + 1}번째 스토리로 이동`}
            />
          );
        })}
      </AnimatePresence>

      {storiesLength > MAX_INDICATORS && (
        <motion.div
          className="mt-2 text-xs text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {currentIndex + 1}/{storiesLength}
        </motion.div>
      )}
    </motion.div>
  );
};

export default StoryIndicators;
