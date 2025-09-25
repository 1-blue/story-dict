"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { openapi } from "#fe/apis";
import {
  SHORTS_LOAD_MORE_THRESHOLD,
  SHORTS_PAGE,
  SHORTS_PAGE_SIZE,
} from "../_constants";

interface IProps {
  loadMoreThreshold?: number;
  page?: number;
  limit?: number;
}

export const useShorts = ({
  loadMoreThreshold = SHORTS_LOAD_MORE_THRESHOLD,
  page: initialPage = SHORTS_PAGE,
  limit: initialLimit = SHORTS_PAGE_SIZE,
}: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    openapi.useInfiniteQuery(
      "get",
      "/apis/v1/stories/shorts",
      { params: { query: { limit, page } } },
      {
        getNextPageParam: (lastStories, allStories) => {
          if (lastStories.payload.length < limit) {
            return undefined;
          }

          return allStories.length + 1;
        },
        initialPageParam: initialPage,
        pageParamName: "page",
      },
    );
  const stories = useMemo(
    () => data?.pages.flatMap((page) => page.payload) ?? [],
    [data],
  );

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      const remainingStories = stories.length - nextIndex;

      if (
        hasNextPage &&
        !isFetchingNextPage &&
        remainingStories <= loadMoreThreshold
      ) {
        fetchNextPage();
      }

      if (nextIndex < stories.length) {
        return nextIndex;
      }
      return prev;
    });
  }, [
    stories.length,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loadMoreThreshold,
  ]);
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);
  const handleIndicatorClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);

      const remainingStories = stories.length - index;

      if (
        hasNextPage &&
        !isFetchingNextPage &&
        remainingStories <= loadMoreThreshold
      ) {
        fetchNextPage();
      }
    },
    [
      stories.length,
      hasNextPage,
      isFetchingNextPage,
      loadMoreThreshold,
      fetchNextPage,
    ],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      const target = e.target;

      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;

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
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious]);

  return {
    stories,
    currentIndex,
    isLoading,

    handleNext,
    handlePrevious,
    handleIndicatorClick,
  };
};
