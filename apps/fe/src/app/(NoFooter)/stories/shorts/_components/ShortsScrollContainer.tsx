"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { components } from "#fe/@types/openapi";
import { useSidebar } from "@sd/ui";
import { cn } from "@sd/ui/libs";
import StoryShortCard from "./StoryShortCard";
import "#fe/css/github-markdown.css";

interface IProps {
  stories: components["schemas"]["GetManyShortsResponsePayloadDTO"][];
}

const ShortsScrollContainer: React.FC<IProps> = ({ stories }) => {
  const { open: sidebarOpen } = useSidebar();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const hasTriggeredNext = useRef(false);
  const scrollAccumulator = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const isOverScrolling = useRef(false);

  const currentEventListeners = useRef<{
    wheel?: (e: WheelEvent) => void;
    touchstart?: (e: TouchEvent) => void;
    touchmove?: (e: TouchEvent) => void;
    touchend?: (e: TouchEvent) => void;
  }>({});

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < stories.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [stories.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const cleanupEventListeners = useCallback(() => {
    if (currentEventListeners.current.wheel) {
      document.removeEventListener(
        "wheel",
        currentEventListeners.current.wheel,
      );
    }
    if (currentEventListeners.current.touchstart) {
      document.removeEventListener(
        "touchstart",
        currentEventListeners.current.touchstart,
      );
    }
    if (currentEventListeners.current.touchmove) {
      document.removeEventListener(
        "touchmove",
        currentEventListeners.current.touchmove,
      );
    }
    if (currentEventListeners.current.touchend) {
      document.removeEventListener(
        "touchend",
        currentEventListeners.current.touchend,
      );
    }
    currentEventListeners.current = {};
  }, []);

  const handleIndicatorClick = useCallback(
    (index: number) => {
      cleanupEventListeners();

      setCurrentIndex(index);
      hasTriggeredNext.current = false;
      scrollAccumulator.current = 0;
      setIsAtBottom(false);
    },
    [cleanupEventListeners],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      const scrollableHeight = documentHeight - windowHeight;
      const atBottom = scrollTop >= scrollableHeight - 5;

      setIsAtBottom(atBottom);

      if (
        atBottom &&
        !hasTriggeredNext.current &&
        currentIndex < stories.length - 1
      ) {
        cleanupEventListeners();

        const handleExtraScroll = (e: WheelEvent) => {
          e.preventDefault();
          scrollAccumulator.current += e.deltaY;

          if (scrollAccumulator.current > 100) {
            hasTriggeredNext.current = true;
            cleanupEventListeners();
            handleNext();
          }
        };

        const handleTouchStart = (e: TouchEvent) => {
          if (!e.touches[0]) return;
          touchStartY.current = e.touches[0].clientY;
          touchStartTime.current = Date.now();
          isOverScrolling.current = true;
        };

        const handleTouchMove = (e: TouchEvent) => {
          if (!isOverScrolling.current || !e.touches[0]) return;

          const currentY = e.touches[0].clientY;
          const deltaY = touchStartY.current - currentY;

          if (deltaY > 0) {
            scrollAccumulator.current += deltaY * 0.3;
          }
        };

        const handleTouchEnd = (e: TouchEvent) => {
          if (!isOverScrolling.current || !e.changedTouches[0]) return;

          const endY = e.changedTouches[0].clientY;
          const endTime = Date.now();
          const deltaY = touchStartY.current - endY;
          const deltaTime = endTime - touchStartTime.current;
          const velocity = Math.abs(deltaY) / deltaTime;

          if (deltaY > 60 || velocity > 0.8) {
            hasTriggeredNext.current = true;
            cleanupEventListeners();
            handleNext();
          }

          isOverScrolling.current = false;
        };

        currentEventListeners.current.wheel = handleExtraScroll;
        currentEventListeners.current.touchstart = handleTouchStart;
        currentEventListeners.current.touchmove = handleTouchMove;
        currentEventListeners.current.touchend = handleTouchEnd;

        document.addEventListener("wheel", handleExtraScroll, {
          passive: false,
        });
        document.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        document.addEventListener("touchmove", handleTouchMove, {
          passive: true,
        });
        document.addEventListener("touchend", handleTouchEnd, {
          passive: true,
        });

        setTimeout(() => {
          cleanupEventListeners();
        }, 5000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanupEventListeners();
    };
  }, [currentIndex, handleNext, stories.length, cleanupEventListeners]);

  useEffect(() => {
    cleanupEventListeners();

    hasTriggeredNext.current = false;
    scrollAccumulator.current = 0;
    setIsAtBottom(false);
    setScrollProgress(0);

    isOverScrolling.current = false;
    touchStartY.current = 0;
    touchStartTime.current = 0;

    window.scrollTo({ top: 0, behavior: "instant" });

    setTimeout(() => {
      hasTriggeredNext.current = false;
      scrollAccumulator.current = 0;
    }, 100);
  }, [currentIndex, cleanupEventListeners]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true"
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowDown":
        case "j":
        case " ":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowUp":
        case "k":
          e.preventDefault();
          handlePrevious();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious]);

  useEffect(() => {
    return () => {
      cleanupEventListeners();
    };
  }, [cleanupEventListeners]);

  const maxIndicators = 7;
  const totalStories = stories.length;

  const getIndicatorRange = () => {
    if (totalStories <= maxIndicators) {
      return { start: 0, end: totalStories };
    }

    const half = Math.floor(maxIndicators / 2);
    let start = Math.max(0, currentIndex - half);
    const end = Math.min(totalStories, start + maxIndicators);

    if (end - start < maxIndicators) {
      start = Math.max(0, end - maxIndicators);
    }

    return { start, end };
  };

  const { start, end } = getIndicatorRange();

  const indicatorVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
    },
  };

  return (
    <div
      ref={containerRef}
      className="shorts-container relative min-h-screen w-full bg-background"
    >
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-gray-200/30">
        <div
          className={`h-full transition-all duration-150 ease-out ${
            isAtBottom ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {isAtBottom && currentIndex < stories.length - 1 && (
        <div
          className={cn(
            "fixed bottom-8 z-50 -translate-x-1/2",
            "left-1/2",
            "md:left-1/2",
            sidebarOpen && "md:left-[calc(50vw+8rem)]",
          )}
        >
          <div className="flex animate-pulse items-center gap-2 rounded-full bg-green-500/90 px-4 py-2 text-sm text-white backdrop-blur-sm">
            <span className="hidden sm:inline">
              더 스크롤하여 다음 스토리로
            </span>
            <span className="sm:hidden">아래로 끌어당겨 다음 스토리로</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </div>
        </div>
      )}

      <motion.div
        className={cn(
          "fixed z-50 flex flex-col items-center gap-2",
          "top-1/2 -translate-y-1/2",
          "left-6",
          "md:left-6",
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
                onClick={() => handleIndicatorClick(storyIndex)}
                className={`w-1 cursor-pointer rounded-full ${
                  isActive
                    ? "h-8 bg-white shadow-lg"
                    : "h-4 bg-white/40 hover:bg-white/60"
                }`}
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

        {totalStories > maxIndicators && (
          <motion.div
            className="mt-2 text-xs text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentIndex + 1}/{totalStories}
          </motion.div>
        )}
      </motion.div>

      <div
        className={cn(
          "mx-auto max-w-4xl px-4",
          "md:ml-0",
          sidebarOpen && "md:ml-[8rem]",
        )}
      >
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
              <StoryShortCard story={stories[currentIndex]} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className={cn(
          "fixed z-40 flex flex-col gap-4",
          "top-[calc(50vh-2rem)] -translate-y-1/2",
          "right-4",
        )}
      >
        <motion.button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-30"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          ↑
        </motion.button>
        <motion.button
          onClick={handleNext}
          disabled={currentIndex === stories.length - 1}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-30"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          ↓
        </motion.button>
      </div>
    </div>
  );
};

export default ShortsScrollContainer;
