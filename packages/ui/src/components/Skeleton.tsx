import { cn } from "#ui/libs";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200/90 dark:bg-zinc-200/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
