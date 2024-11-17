"use client";

import Link from "next/link";
import { FaceFrownIcon, CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { Alert, Button, Calendar } from "@sd/ui";

import { routes } from "#fe/constants";

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<IProps> = ({ error, reset }) => {
  console.log("🚀 error.name >> ", JSON.parse(JSON.stringify(error)));

  return (
    <article className="flex flex-col items-center justify-center gap-8">
      <Alert>
        <p>
          지속적으로 실패한다면
          <Link href={routes.openKakaoChat.url} target="_blank">
            <Button variant="link" className="px-1 py-0">
              오픈 카톡방
            </Button>
          </Link>
          으로 문의해주시거나 기다려주세요! (
          <Link href={routes.home.url}>
            <Button variant="link" className="px-1 py-0">
              메인 페이지로 이동
            </Button>
          </Link>
          )
          <br />
          에러는 따로 트래킹중이기 때문에 확인하는 즉시 해결하겠습니다.
        </p>
      </Alert>
      <section className="mt-[4%] flex items-center gap-2">
        <FaceFrownIcon className="h-8 w-8" />
        <h2 className="text-xl font-bold">알 수 없는 오류가 발생했습니다.</h2>
        <FaceFrownIcon className="h-8 w-8" />
      </section>
      <section className="flex flex-col items-center gap-2">
        <Button
          variant="secondary"
          className="flex items-center gap-2"
          onClick={reset}
        >
          <CursorArrowRaysIcon className="h-6 w-6" />
          <span className="text-base font-semibold">다시 시도하기</span>
          <CursorArrowRaysIcon className="h-6 w-6" />
        </Button>
      </section>
      <section>
        <Calendar />
      </section>
    </article>
  );
};

export default Error;
