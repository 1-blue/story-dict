"use client";

import { motion, AnimatePresence } from "framer-motion";

import type { components } from "#fe/@types/openapi";
import StoryShort from "./StoryShort";

interface IProps {
  stories: components["schemas"]["GetManyShortsResponsePayloadDTO"][];
  currentIndex: number;
}

const StoryShortAnimate: React.FC<IProps> = ({ stories, currentIndex }) => {
  return (
    <div className="mx-auto max-w-4xl">
      <AnimatePresence mode="wait" custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.25, 0.25, 1],
          }}
        >
          {stories[currentIndex] && (
            <StoryShort story={stories[currentIndex]} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StoryShortAnimate;
