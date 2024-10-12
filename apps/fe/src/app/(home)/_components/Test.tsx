"use client";

import useMe from "#fe/hooks/useMe";
import { trpc } from "#fe/libs/trpc";
import { Button } from "@xstory/ui";

const Test: React.FC = () => {
  const { data, isLoading, refetch } = trpc.cats.getAll.useQuery();
  const { me, logOutMutation, meMutation } = useMe();

  return (
    <div className="flex flex-col items-center justify-center">
      <p>{JSON.stringify(me?.nickname)}</p>

      <button type="button" onClick={() => logOutMutation.mutate()}>
        로그아웃
      </button>

      <button type="button" onClick={() => meMutation.mutate()}>
        유저정보리패치
      </button>

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
