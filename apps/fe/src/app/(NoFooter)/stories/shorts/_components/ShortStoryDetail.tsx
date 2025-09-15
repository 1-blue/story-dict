"use client";

import "#fe/css/github-markdown.css";
import { useShorts } from "#fe/app/(NoFooter)/stories/shorts/_hooks/useShorts";

import ShortStoryDetailLoading from "./ShortStoryDetailLoading";
import StoryIndicators from "./Section01/StoryIndicators";
import NavigationButtons from "./Section02/NavigationButtons";
import StoryShortAnimate from "./Section03/StoryShortAnimate";

const ShortStoryDetail: React.FC = () => {
  const {
    stories,
    currentIndex,
    isLoading,
    handleNext,
    handlePrevious,
    handleIndicatorClick,
  } = useShorts({
    loadMoreThreshold: 3,
  });

  if (isLoading) {
    return <ShortStoryDetailLoading />;
  }

  return (
    <div className="relative min-h-screen w-full bg-background">
      <StoryIndicators
        currentIndex={currentIndex}
        storiesLength={stories.length}
        onIndicatorClick={handleIndicatorClick}
      />

      <StoryShortAnimate stories={stories} currentIndex={currentIndex} />

      <NavigationButtons
        currentIndex={currentIndex}
        storiesLength={stories.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default ShortStoryDetail;
