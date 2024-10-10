"use client";

import { trpc } from "#fe/libs/trpc";
import { Button } from "@xstory/ui";

const Test: React.FC = () => {
  const { data, isLoading, refetch } = trpc.cats.getAll.useQuery();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">고양이 !!!</h1>
      <h2 className="text-xl font-bold">전지적 독자 시점</h2>

      <span>{isLoading ? "로딩중..." : "로딩완료"}</span>

      <Button onClick={() => refetch()}>Click me</Button>

      <ul className="list-disc">
        {data?.map((cat) => <li key={cat.id}>{cat.name}</li>)}
      </ul>
    </div>
  );
};

export default Test;
