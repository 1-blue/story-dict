"use client";

const ShortStoryDetailLoading: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        <span>이야기 로딩 중...</span>
      </div>
    </div>
  );
};

export default ShortStoryDetailLoading;
