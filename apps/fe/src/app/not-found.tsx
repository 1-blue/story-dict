import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import { Alert, Button, Calendar } from "@sd/ui";

import { routes } from "#fe/constants";

const NotFound = () => {
  return (
    <article className="flex flex-col items-center justify-center gap-8">
      <Alert>
        <p>
          존재하지 않는 페이지입니다. (
          <Link href={routes.home.url}>
            <Button variant="link" className="px-1 py-0">
              메인 페이지로 이동
            </Button>
          </Link>
          )
        </p>
      </Alert>
      <section className="mt-[4%] flex items-center gap-2">
        <FaceFrownIcon className="h-8 w-8" />
        <h2 className="text-xl font-bold">404 Not Found</h2>
        <FaceFrownIcon className="h-8 w-8" />
      </section>

      <section>
        <Calendar />
      </section>
    </article>
  );
};

export default NotFound;
