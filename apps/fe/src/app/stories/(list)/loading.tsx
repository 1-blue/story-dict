import { Skeleton } from "@sd/ui";

const Loading: React.FC = () => {
  return (
    <article>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-full w-full rounded-lg" />
        ))}
      </ul>
    </article>
  );
};

export default Loading;
