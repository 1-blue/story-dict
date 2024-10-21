import SearchedPosts from "./_components/SearchedPosts";

interface PageProps {
  params: {
    keyword: string;
  };
}

const Page: React.FC<PageProps> = ({ params: { keyword } }) => {
  return <SearchedPosts keyword={keyword} />;
};

export default Page;
