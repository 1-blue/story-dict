import { Skeleton } from "@sd/ui";

const Loading: React.FC = () => {
  return (
    <article className="flex flex-col gap-4">
      <Skeleton className="h-9 w-48 rounded-lg" />

      <ul className="flex flex-wrap gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-80 rounded-lg" />
        ))}
      </ul>
    </article>
  );
};

export default Loading;
