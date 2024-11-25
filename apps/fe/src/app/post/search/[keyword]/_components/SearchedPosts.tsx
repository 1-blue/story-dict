"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { apis } from "#fe/apis";
import PostCard from "#fe/components/PostCard";
import EmptyAlert from "#fe/components/EmptyAlert";

interface IProps {
  keyword: string;
}

const SearchedPosts: React.FC<IProps> = ({ keyword }) => {
  const { data: posts } = useSuspenseQuery({
    queryKey: apis.posts.getManyKeyword.key({ params: { keyword } }),
    queryFn: () => apis.posts.getManyKeyword.fn({ params: { keyword } }),
  });

  return (
    <article>
      {posts.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <EmptyAlert
          title="게시글 없음"
          description={`"${decodeURIComponent(keyword)}" 키워드의 게시글이 존재하지 않아요 🥲`}
        />
      )}
    </article>
  );
};

export default SearchedPosts;
