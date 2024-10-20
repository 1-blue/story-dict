import LatestPosts from "#fe/app/(home)/_components/LatestPosts";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@xstory/ui";

const Page = () => {
  return (
    <div className="flex flex-col gap-6">
      <Alert className="mx-auto max-w-3xl">
        <RocketIcon className="h-5 w-5" />
        <AlertTitle className="line-clamp-1 text-lg">
          간단한 정보/이야기를 기록
        </AlertTitle>
        <AlertDescription className="line-clamp-1 text-sm text-muted-foreground">
          나만 아는 특별한 정보/이야기를 등록하고 사람들과 나눠보세요!
        </AlertDescription>
      </Alert>
      <LatestPosts />
    </div>
  );
};

export default Page;
