import { Skeleton } from "@sd/ui";

const Loading: React.FC = () => {
  return (
    <article className="flex flex-col gap-2">
      <Skeleton className="h-9 w-full rounded-lg" />

      <Skeleton className="h-[calc(100vh-281px)] w-full rounded-lg" />
    </article>
  );
};

export default Loading;
