import type { Post } from "#be/types";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sd/ui";
import { Marquee } from "@sd/ui/magics";
import { convertToCategory } from "@sd/utils";
import Link from "next/link";

const posts: Pick<Post, "title" | "summary" | "category">[] = [
  {
    title: `윤슬`,
    summary: `햇빛이나 달빛이 비치어 반짝이는 잔물결`,
    category: `PURE_KOREAN`,
  },
  {
    title: `바쿠스`,
    summary: `바쿠스는 그리스 로마 신화의 디오니소스의 라틴어 발음`,
    category: `ETYMOLOGY`,
  },
  {
    title: `플라톤`,
    summary: `플라톤은 "plat"(평평한)에서 유래된 말`,
    category: `ETYMOLOGY`,
  },
  {
    title: `마지노선`,
    summary: `제1차, 제2차 세계대전에서 생겨난 말`,
    category: `ETYMOLOGY`,
  },
  {
    title: `개복치`,
    summary: `사실 개복치는 매우 단단한 존재`,
    category: `INFORMATION`,
  },
];

const firstRow = posts.slice(0, posts.length / 2);
const secondRow = posts.slice(posts.length / 2);

interface IPostCardProps {
  title: Post["title"];
  summary: Post["summary"];
  category: Post["category"];
}

const PostCard: React.FC<IPostCardProps> = ({ title, summary, category }) => {
  return (
    <Card className="flex w-64 flex-col sm:w-80">
      <Link href={`/post/${title}`} className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle className="typography-body-sm overflow-hidden text-ellipsis">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="line-clamp-3 whitespace-pre-wrap">
            {summary}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="flex items-end justify-between">
        <Link href={`/post/category/${category}`}>
          <Badge>{convertToCategory(category)}</Badge>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Section04: React.FC = () => {
  return (
    <div className="relative flex w-[calc(100vw-64px)] flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <PostCard key={review.title} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </Marquee>
    </div>
  );
};

export default Section04;
